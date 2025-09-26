package com.yourpackage

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.content.res.AssetManager
import android.os.Binder
import android.os.Build
import android.os.IBinder
import android.util.Log
import java.io.*
import java.lang.Exception

class NodeService : Service() {
    private val TAG = "NodeService"
    
    // Assets中的Node.js目录和JS脚本
    private val NODE_DIR_NAME = "nodejs"       // Assets中的Node.js目录名
    private val JS_SCRIPT_NAME = "app.js"      // 待运行的JS脚本名
    
    // 应用私有目录中的路径
    private lateinit var nodeDir: File         // 复制后的Node.js目录
    private lateinit var nodeExecutable: File  // Node可执行文件路径：nodejs/bin/node
    private lateinit var jsScriptFile: File    // JS脚本文件
    
    private var nodeProcess: Process? = null
    private val binder = LocalBinder()

    inner class LocalBinder : Binder() {
        val service: NodeService
            get() = this@NodeService
    }

    override fun onCreate() {
        super.onCreate()
        Log.d(TAG, "Service onCreate")
        
        // 初始化文件路径（应用私有目录：/data/data/包名/files/）
        nodeDir = File(filesDir, NODE_DIR_NAME)
        nodeExecutable = File(nodeDir, "bin/node")
        jsScriptFile = File(filesDir, JS_SCRIPT_NAME)
        
        // 1. 从Assets复制整个Node.js目录和JS脚本到私有目录
        copyAssetDirectory(NODE_DIR_NAME, nodeDir)
        copyAssetFile(JS_SCRIPT_NAME, jsScriptFile)
        
        // 2. 为Node可执行文件设置可执行权限
        setExecutablePermission(nodeExecutable)
        
        // 3. 适配Android 8.0+，创建前台服务通知
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel()
            startForeground(NOTIFICATION_ID, buildNotification())
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        Log.d(TAG, "Service onStartCommand")
        // 启动Node进程并运行JS脚本
        startNodeProcess()
        return START_STICKY  // 服务被杀死后尝试重启
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d(TAG, "Service onDestroy")
        // 停止Node进程
        stopNodeProcess()
        // 移除前台服务通知
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            stopForeground(STOP_FOREGROUND_REMOVE)
        }
    }

    override fun onBind(intent: Intent): IBinder {
        return binder
    }

    /**
     * 从Assets复制整个目录到应用私有目录
     */
    private fun copyAssetDirectory(assetDirName: String, targetDir: File) {
        if (targetDir.exists()) {
            Log.d(TAG, "目录已存在: ${targetDir.absolutePath}")
            return
        }
        
        // 创建目标目录
        if (!targetDir.mkdirs()) {
            Log.e(TAG, "创建目录失败: ${targetDir.absolutePath}")
            return
        }

        try {
            // 获取Assets目录下的所有文件和子目录
            val assetManager = assets
            val fileList = assetManager.list(assetDirName) ?: return
            
            for (fileName in fileList) {
                val assetPath = "$assetDirName/$fileName"
                val targetPath = File(targetDir, fileName).absolutePath
                
                // 判断是文件还是目录
                if (isAssetDirectory(assetManager, assetPath)) {
                    // 递归复制子目录
                    copyAssetDirectory(assetPath, File(targetDir, fileName))
                } else {
                    // 复制文件
                    copyAssetFile(assetPath, File(targetDir, fileName))
                }
            }
            Log.d(TAG, "目录复制成功: ${targetDir.absolutePath}")
        } catch (e: Exception) {
            Log.e(TAG, "目录复制失败 ($assetDirName): ${e.message}")
        }
    }

    /**
     * 从Assets复制单个文件到应用私有目录
     */
    private fun copyAssetFile(assetFileName: String, targetFile: File) {
        if (targetFile.exists()) {
            Log.d(TAG, "文件已存在: ${targetFile.absolutePath}")
            return
        }

        var inputStream: InputStream? = null
        var outputStream: FileOutputStream? = null

        try {
            // 从Assets读取文件
            inputStream = assets.open(assetFileName)
            // 写入私有目录
            outputStream = FileOutputStream(targetFile)
            
            val buffer = ByteArray(4096)
            var bytesRead: Int
            while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                outputStream.write(buffer, 0, bytesRead)
            }
            Log.d(TAG, "文件复制成功: ${targetFile.absolutePath}")
        } catch (e: Exception) {
            Log.e(TAG, "文件复制失败 ($assetFileName): ${e.message}")
        } finally {
            inputStream?.close()
            outputStream?.close()
        }
    }

    /**
     * 判断Assets中的路径是否为目录
     */
    private fun isAssetDirectory(assetManager: AssetManager, assetPath: String): Boolean {
        return try {
            // 通过尝试打开目录获取文件列表来判断是否为目录
            assetManager.list(assetPath)?.isNotEmpty() ?: false
        } catch (e: Exception) {
            false
        }
    }

    /**
     * 为文件设置可执行权限（chmod 755）
     */
    private fun setExecutablePermission(file: File) {
        if (!file.exists()) {
            Log.e(TAG, "文件不存在: ${file.name}")
            return
        }

        try {
            // 执行chmod命令
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

    /**
     * 启动Node进程，执行JS脚本（携带脚本路径作为参数）
     */
    private fun startNodeProcess() {
        Thread {
            // 检查文件是否存在
            if (!nodeExecutable.exists() || !jsScriptFile.exists()) {
                Log.e(TAG, "Node可执行文件或JS脚本不存在")
                Log.e(TAG, "Node路径: ${nodeExecutable.absolutePath}")
                Log.e(TAG, "JS路径: ${jsScriptFile.absolutePath}")
                return@Thread
            }

            try {
                // 构建命令：node可执行文件路径 + js脚本路径
                val command = listOf(
                    nodeExecutable.absolutePath,
                    jsScriptFile.absolutePath
                )
                Log.d(TAG, "执行命令: ${command.joinToString(" ")}")

                // 启动进程
                val processBuilder = ProcessBuilder(command)
                    .redirectErrorStream(true)  // 合并错误流到输出流
                nodeProcess = processBuilder.start()
                Log.d(TAG, "Node进程启动，PID: ${nodeProcess?.pid()}")

                // 读取Node输出日志（console.log）
                readProcessOutput(nodeProcess?.inputStream)

                // 等待进程结束
                val exitCode = nodeProcess?.waitFor()
                Log.d(TAG, "Node进程退出，退出码: $exitCode")
            } catch (e: Exception) {
                Log.e(TAG, "启动Node失败: ${e.message}")
            }
        }.start()
    }

    /**
     * 读取进程输出日志
     */
    private fun readProcessOutput(inputStream: InputStream?) {
        inputStream ?: return
        BufferedReader(InputStreamReader(inputStream)).use { reader ->
            var line: String?
            while (reader.readLine().also { line = it } != null) {
                Log.d("NodeOutput", line)  // 打印JS脚本输出
            }
        }
    }

    /**
     * 停止Node进程
     */
    private fun stopNodeProcess() {
        nodeProcess?.takeIf { it.isAlive }?.apply {
            Log.d(TAG, "停止Node进程，PID: ${this.pid()}")
            destroy()  // 终止进程
            try {
                waitFor()  // 等待进程结束
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

    /**
     * 创建通知渠道（Android 8.0+ 必需）
     */
    private fun createNotificationChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            CHANNEL_NAME,
            NotificationManager.IMPORTANCE_LOW  // 低优先级，不打扰用户
        )
        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager.createNotificationChannel(channel)
    }

    /**
     * 构建前台服务通知
     */
    private fun buildNotification(): Notification {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Notification.Builder(this, CHANNEL_ID)
                .setContentTitle("Node服务运行中")
                .setContentText("后台执行JS脚本")
                .setSmallIcon(R.mipmap.ic_launcher)  // 替换为你的图标
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
