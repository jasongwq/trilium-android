package com.ypwq.ypwq.trilium

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.Binder
import android.os.Build
import android.os.IBinder
import android.util.Log
import java.io.*
import java.lang.Exception

class NodeService : Service() {
    private val TAG = "NodeService"
    private val TRILIUM_DIR_NAME = "trilium" // Assets中的trilium目录
    private val JS_SCRIPT_NAME = "main.cjs" // 待运行的JS脚本
    private val NODE_EXECUTABLE_PATH = "node/bin/node" // Node可执行文件相对路径
    private lateinit var nodeDir: File // 私有目录中的Node.js目录
    private lateinit var nodeExecutableFile: File // Node可执行文件
    private lateinit var jsScriptFile: File
    private var nodeProcess: Process? = null
    private val binder = LocalBinder()

    inner class LocalBinder : Binder() {
        val service: NodeService
            get() = this@NodeService
    }

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "Service onCreate")

        // 初始化文件路径
        nodeDir = File(filesDir, TRILIUM_DIR_NAME)
        nodeExecutableFile = File(nodeDir, NODE_EXECUTABLE_PATH)
        jsScriptFile = File(nodeDir, JS_SCRIPT_NAME)

        // 1. 从Assets复制Node目录和JS脚本
        copyAssetDirectory(TRILIUM_DIR_NAME, nodeDir)

        // 2. 为Node可执行文件设置权限
        setExecutablePermission(nodeExecutableFile)

        // 3. 启动前台服务
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel()
            startForeground(NOTIFICATION_ID, buildNotification())
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "Service onStartCommand")
        startNodeProcess()
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "Service onDestroy")
        stopNodeProcess()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            stopForeground(STOP_FOREGROUND_REMOVE)
        }
    }

    override fun onBind(intent: Intent): IBinder {
        return binder
    }

    /** 复制Assets中的目录到私有目录（递归处理子目录） */
    private fun copyAssetDirectory(assetDirName: String, targetDir: File) {
        // 检查目录是否存在，存在则进行版本和标志文件校验
        if (targetDir.exists()) {
            Log.d(TAG, "目录已存在，开始校验: ${targetDir.absolutePath}")
            val versionFileInTarget = File(targetDir, "version.txt")
            val completeFlagFile = File(targetDir, "copy_complete.flag")
            var needReCopy = false

            // 检查必要文件是否存在
            if (!versionFileInTarget.exists() || !completeFlagFile.exists()) {
                Log.d(TAG, "缺少version.txt或完成标志文件，需要重新拷贝")
                needReCopy = true
            } else {
                // 读取目标目录版本信息
                val targetVersion = try {
                    versionFileInTarget.readText().trim()
                } catch (e: Exception) {
                    Log.e(TAG, "读取目标版本文件失败", e)
                    null
                }

                // 读取Assets中的版本信息
                val sourceVersion = try {
                    assets.open("$assetDirName/version.txt").bufferedReader().use { it.readText().trim() }
                } catch (e: Exception) {
                    Log.e(TAG, "读取源版本文件失败", e)
                    null
                }

                // 版本校验不通过
                if (targetVersion == null || sourceVersion == null || targetVersion != sourceVersion) {
                    Log.d(TAG, "版本不一致，需要重新拷贝 (源版本: $sourceVersion, 目标版本: $targetVersion)")
                    needReCopy = true
                } else {
                    Log.d(TAG, "版本一致且已完成拷贝，无需操作")
                    return
                }
            }

            // 需要重新拷贝时删除现有目录
            if (needReCopy) {
                if (deleteDirectory(targetDir)) {
                    Log.d(TAG, "旧目录已删除: ${targetDir.absolutePath}")
                } else {
                    Log.e(TAG, "删除旧目录失败，无法继续拷贝")
                    return
                }
            }
        }

        // 创建目标目录
        if (!targetDir.mkdirs()) {
            Log.e(TAG, "创建目录失败: ${targetDir.absolutePath}")
            return
        }

        try {
            // 获取Assets中目录下的所有文件/子目录
            val assetFiles = assets.list(assetDirName) ?: return

            for (fileName in assetFiles) {
                val assetPath = "$assetDirName/$fileName"
                val targetFile = File(targetDir, fileName)

                if (isAssetDirectory(assetPath)) {
                    // 递归复制子目录
                    copyAssetDirectory(assetPath, targetFile)
                } else {
                    // 复制文件
                    copyAssetFile(assetPath, targetFile)
                }
            }

            // 拷贝完成后创建标志文件
            val completeFlagFile = File(targetDir, "copy_complete.flag")
            if (completeFlagFile.createNewFile()) {
                Log.d(TAG, "拷贝完成标志文件已创建: ${completeFlagFile.absolutePath}")
            } else {
                Log.e(TAG, "创建拷贝完成标志文件失败")
            }

            Log.d(TAG, "目录复制成功: ${targetDir.absolutePath}")
        } catch (e: Exception) {
            Log.e(TAG, "目录复制失败 ($assetDirName): ${e.message}", e)
            // 拷贝失败时清理目录
            deleteDirectory(targetDir)
        }
    }

    /** 递归删除目录及其中所有内容 */
    private fun deleteDirectory(dir: File): Boolean {
        if (dir.isDirectory) {
            val files = dir.listFiles() ?: return false
            // 先删除子文件和子目录
            files.forEach { if (!deleteDirectory(it)) return false }
        }
        // 最后删除自身
        return dir.delete()
    }

    /** 复制Assets中的单个文件 */
    private fun copyAssetFile(assetFilePath: String, targetFile: File) {
        var inputStream: InputStream? = null
        var outputStream: FileOutputStream? = null

        try {
            inputStream = assets.open(assetFilePath)
            outputStream = FileOutputStream(targetFile)

            val buffer = ByteArray(4096)
            var bytesRead: Int
            while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                outputStream.write(buffer, 0, bytesRead)
            }
        } catch (e: Exception) {
            Log.e(TAG, "文件复制失败 ($assetFilePath): ${e.message}")
        } finally {
            inputStream?.close()
            outputStream?.close()
        }
    }

    /** 判断Assets中的路径是否为目录 */
    private fun isAssetDirectory(assetPath: String): Boolean {
        return try {
            val inputStream = assets.open(assetPath)
            inputStream.close()
            false // 能打开则为文件
        } catch (e: FileNotFoundException) {
            true // 抛出文件未找到异常则为目录
        } catch (e: Exception) {
            false
        }
    }

    /** 为文件设置可执行权限 */
    private fun setExecutablePermission(file: File) {
        if (!file.exists()) {
            Log.e(TAG, "文件不存在: ${file.name}")
            return
        }

        try {
            val process = Runtime.getRuntime().exec("chmod 755 ${file.absolutePath}")
            val exitCode = process.waitFor()
            if (exitCode == 0) {
                Log.d(TAG, "权限设置成功: ${file.name}")
            } else {
                Log.e(TAG, "权限设置失败，退出码: $exitCode")
            }
        } catch (e: Exception) {
            Log.e(TAG, "权限设置异常: ${e.message}")
        }
    }

    /** 启动Node进程 */
    private fun startNodeProcess() {
        Thread {
                    if (!nodeExecutableFile.exists() || !jsScriptFile.exists()) {
                        Log.e(TAG, "Node可执行文件或JS脚本不存在")
                        return@Thread
                    }

                    try {
                        // 1. 构建Node启动命令（node可执行文件 + JS脚本路径）
                        val command =
                                listOf(nodeExecutableFile.absolutePath, jsScriptFile.absolutePath)
                        Log.d(TAG, "执行命令: ${command.joinToString(" ")}")
                        // 2. 创建ProcessBuilder并配置环境变量
                        val processBuilder =
                                ProcessBuilder(command).redirectErrorStream(true) // 合并错误流到输出流，方便调试
                        // 3. 获取进程环境变量集合（默认继承当前应用环境）
                        val env = processBuilder.environment()

                        // 4. 设置OPENSSL_CONF：指向Node目录下bin文件夹中的空openssl.cnf
                        val opensslConfPath = File(nodeDir, "node/bin/openssl.cnf").absolutePath
                        env["OPENSSL_CONF"] = opensslConfPath // 关键：指定OpenSSL配置文件路径

                        // 5. 设置LD_LIBRARY_PATH（可选，若Node依赖自定义库，指向lib目录）
                        val nodeLibPath = File(nodeDir, "node/lib").absolutePath
                        env["LD_LIBRARY_PATH"] = nodeLibPath // 让Node找到依赖的动态库（如libnode.so）
                        Log.d(TAG, "HOME 配置: ${env["HOME"]}")
                        val homePath = filesDir.absolutePath
                        env["HOME"] = homePath
                        // 打印环境变量配置（用于验证）
                        Log.d(TAG, "HOME 配置: ${env["HOME"]}")
                        Log.d(TAG, "OPENSSL_CONF 配置: ${env["OPENSSL_CONF"]}")
                        Log.d(TAG, "LD_LIBRARY_PATH 配置: ${env["LD_LIBRARY_PATH"]}")
                        // 检查 OPENSSL_CONF 指向的文件是否存在
                        val opensslConfFile = File(env["OPENSSL_CONF"] ?: "")
                        Log.d(TAG, "OPENSSL_CONF 文件是否存在: ${opensslConfFile.exists()}")
                        // 启动进程前日志
                        Log.d(TAG, "即将启动 Node 进程...")

                        // 7. 启动进程
                        nodeProcess = processBuilder.start()

                        // 兼容处理PID获取（API 26+支持）
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            // Log.d(TAG, "Node进程启动，PID: ${nodeProcess?.pid()}")
                            Log.d(TAG, "Node进程启动成功")
                        } else {
                            Log.d(TAG, "Node进程启动成功")
                        }

                        readProcessOutput(nodeProcess?.inputStream)

                        val exitCode = nodeProcess?.waitFor()
                        Log.d(TAG, "Node进程退出，退出码: $exitCode")
                    } catch (e: Exception) {
                        Log.e(TAG, "启动Node失败: ${e.message}")
                    }
                }
                .start()
    }
    private fun readProcessOutput(inputStream: InputStream?) {
        if (inputStream == null) {
            Log.e(TAG, "readProcessOutput: 输入流为空")
            return
        }
        Log.d(TAG, "开始读取 Node 进程输出流...")
        // 用线程单独读取，避免阻塞主线程（即使之前在子线程，也要确保流读取不卡住）
        Thread {
                    try {
                        val reader = BufferedReader(InputStreamReader(inputStream, Charsets.UTF_8))
                        var line: String?
                        // 循环读取，直到流结束（进程退出）
                        while (reader.readLine().also { line = it } != null) {
                            Log.d("NodeOutput", line ?: "空行")
                        }
                        Log.d(TAG, "Node 进程输出流读取完毕（进程可能已退出）")
                    } catch (e: Exception) {
                        Log.e(TAG, "读取输出流抛出异常", e)
                    }
                }
                .start()
    }

    /** 读取进程输出 */
    private fun readProcessOutputi2(inputStream: InputStream?) {
        inputStream ?: return
        BufferedReader(InputStreamReader(inputStream)).use { reader ->
            var line: String?
            while (reader.readLine().also { line = it } != null) {
                // 修复：使用安全调用避免null传递给Log.d
                line?.let { Log.d("NodeOutput", it) }
            }
        }
    }

    /** 停止Node进程 */
    private fun stopNodeProcess() {
        nodeProcess?.takeIf { it.isAlive }?.apply {
            // 兼容处理PID打印
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                // Log.d(TAG, "停止Node进程，PID: ${this.pid()}")
                Log.d(TAG, "停止Node进程")
            } else {
                Log.d(TAG, "停止Node进程")
            }

            destroy()
            try {
                waitFor()
                Log.d(TAG, "Node进程已停止")
            } catch (e: InterruptedException) {
                Log.e(TAG, "停止进程异常: ${e.message}")
            }
            nodeProcess = null
        }
    }

    // 前台服务通知相关
    private val CHANNEL_ID = "NodeService_Channel"
    private val CHANNEL_NAME = "Node服务"
    private val NOTIFICATION_ID = 1001

    private fun createNotificationChannel() {
        val channel =
                NotificationChannel(CHANNEL_ID, CHANNEL_NAME, NotificationManager.IMPORTANCE_LOW)
        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager.createNotificationChannel(channel)
    }

    private fun buildNotification(): Notification {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Notification.Builder(this, CHANNEL_ID)
                    .setContentTitle("Node服务运行中")
                    .setContentText("后台执行JS脚本")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .build()
        } else {
            @Suppress("DEPRECATION")
            Notification.Builder(this)
                    .setContentTitle("Node服务运行中")
                    .setContentText("后台执行JS脚本")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .build()
        }
    }
}
