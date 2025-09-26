package com.ncorti.kotlin.template.app

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
    // Assets中的文件名和目录
    private val NODE_DIR_NAME = "nodejs"       // Assets中的Node.js目录
    private val JS_SCRIPT_NAME = "app.js"      // 待运行的JS脚本
    private val NODE_EXECUTABLE_PATH = "bin/node" // Node可执行文件相对路径
    // 应用私有目录中的文件
    private lateinit var nodeDir: File         // 私有目录中的Node.js目录
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
        nodeDir = File(filesDir, NODE_DIR_NAME)
        nodeExecutableFile = File(nodeDir, NODE_EXECUTABLE_PATH)
        jsScriptFile = File(filesDir, JS_SCRIPT_NAME)
        
        // 1. 从Assets复制Node目录和JS脚本
        copyAssetDirectory(NODE_DIR_NAME, nodeDir)
        copyAssetToPrivateDir(JS_SCRIPT_NAME, jsScriptFile)
        
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

    /**
     * 复制Assets中的目录到私有目录（递归处理子目录）
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
            Log.d(TAG, "目录复制成功: ${targetDir.absolutePath}")
        } catch (e: Exception) {
            Log.e(TAG, "目录复制失败 ($assetDirName): ${e.message}")
        }
    }

    /**
     * 复制Assets中的单个文件
     */
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

    /**
     * 复制单个文件（用于JS脚本）
     */
    private fun copyAssetToPrivateDir(assetFileName: String, targetFile: File) {
        if (targetFile.exists()) {
            Log.d(TAG, "文件已存在: ${targetFile.absolutePath}")
            return
        }

        var inputStream: InputStream? = null
        var outputStream: FileOutputStream? = null

        try {
            inputStream = assets.open(assetFileName)
            outputStream = FileOutputStream(targetFile)
            
            val buffer = ByteArray(4096)
            var bytesRead: Int
            while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                outputStream.write(buffer, 0, bytesRead)
            }
            Log.d(TAG, "复制成功: ${targetFile.absolutePath}")
        } catch (e: Exception) {
            Log.e(TAG, "复制失败 ($assetFileName): ${e.message}")
        } finally {
            inputStream?.close()
            outputStream?.close()
        }
    }

    /**
     * 判断Assets中的路径是否为目录
     */
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

    /**
     * 为文件设置可执行权限
     */
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

    /**
     * 启动Node进程
     */
    private fun startNodeProcess() {
        Thread {
            if (!nodeExecutableFile.exists() || !jsScriptFile.exists()) {
                Log.e(TAG, "Node可执行文件或JS脚本不存在")
                return@Thread
            }

            try {
                val command = listOf(
                    nodeExecutableFile.absolutePath,
                    jsScriptFile.absolutePath
                )
                Log.d(TAG, "执行命令: ${command.joinToString(" ")}")

                val processBuilder = ProcessBuilder(command)
                    .redirectErrorStream(true)
                nodeProcess = processBuilder.start()
                
                // 兼容处理PID获取（API 26+支持）
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    //Log.d(TAG, "Node进程启动，PID: ${nodeProcess?.pid()}")
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
        }.start()
    }

    /**
     * 读取进程输出
     */
    private fun readProcessOutput(inputStream: InputStream?) {
        inputStream ?: return
        BufferedReader(InputStreamReader(inputStream)).use { reader ->
            var line: String?
            while (reader.readLine().also { line = it } != null) {
                // 修复：使用安全调用避免null传递给Log.d
                line?.let { Log.d("NodeOutput", it) }
            }
        }
    }

    /**
     * 停止Node进程
     */
    private fun stopNodeProcess() {
        nodeProcess?.takeIf { it.isAlive }?.apply {
            // 兼容处理PID打印
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                //Log.d(TAG, "停止Node进程，PID: ${this.pid()}")
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
        val channel = NotificationChannel(
            CHANNEL_ID,
            CHANNEL_NAME,
            NotificationManager.IMPORTANCE_LOW
        )
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
    