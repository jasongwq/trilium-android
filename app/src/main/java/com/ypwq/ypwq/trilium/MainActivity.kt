package com.ypwq.ypwq.trilium

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.view.KeyEvent
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.widget.Toast
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException
import java.util.concurrent.TimeUnit

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    // 默认加载的网页地址
    private val defaultUrl = "http://127.0.0.1:8080"

    private val targetUrl = "http://127.0.0.1:8080/api/health-check" // 待检测并加载的本地服务URL
    private val okHttpClient = OkHttpClient.Builder()
        .connectTimeout(3, TimeUnit.SECONDS) // 连接超时时间
        .readTimeout(3, TimeUnit.SECONDS)    // 读取超时时间
        .build()
    private val handler = Handler(Looper.getMainLooper())
    private var checkRunnable: Runnable? = null // 轮询任务
    private val retryInterval = 2000L // 重试间隔（2秒）
    private val maxRetryCount = 10    // 最大重试次数（避免无限轮询）
    private var currentRetryCount = 0  // 当前重试次数

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // App启动时自动启动NodeService
        startNodeService()

        setContentView(R.layout.activity_main)
        webView = findViewById(R.id.webView)
        // 配置WebView
        setupWebView()
        startServerCheck() // 启动服务可用性检测
    }


    private fun startServerCheck() {
        val checkTask = object : Runnable {
            override fun run() {
                if (currentRetryCount >= maxRetryCount) {
                    handler.post {
                        Toast.makeText(this@MainActivity, "服务未就绪，已达到最大重试次数", Toast.LENGTH_LONG).show()
                    }
                    return
                }

                val request = Request.Builder()
                    .url(targetUrl)
                    .head()
                    .build()

                okHttpClient.newCall(request).enqueue(object : Callback {
                    override fun onFailure(call: Call, e: IOException) {
                        currentRetryCount++
                        // 引用全局变量 checkRunnable（强转为 Runnable）
                        checkRunnable?.let { handler.postDelayed(it, retryInterval) } 
                        handler.post {
                            Toast.makeText(this@MainActivity, "服务未就绪，${currentRetryCount}/${maxRetryCount} 重试中...", Toast.LENGTH_SHORT).show()
                        }
                    }

                    override fun onResponse(call: Call, response: Response) {
                        if (response.isSuccessful && response.code == 200) {
                            // 成功：停止检测（移除全局任务）
                            checkRunnable?.let { handler.removeCallbacks(it) }
                            handler.post {
                                Toast.makeText(this@MainActivity, "服务就绪，开始加载页面", Toast.LENGTH_SHORT).show()
                                webView.loadUrl(defaultUrl)
                            }
                        } else {
                            currentRetryCount++
                            // 引用全局变量 checkRunnable（强转为 Runnable）
                            checkRunnable?.let { handler.postDelayed(it, retryInterval) } 
                            handler.post {
                                Toast.makeText(this@MainActivity, "服务响应异常（${response.code}），${currentRetryCount}/${maxRetryCount} 重试中...", Toast.LENGTH_SHORT).show()
                            }
                        }
                        response.close()
                    }
                })
            }
        }

        // 赋值给全局变量，供 Callback 内部引用
        checkRunnable = checkTask
        handler.post(checkTask)
    }

    /**
     * 启动Node服务（适配Android 8.0+前台服务机制）
     */
    private fun startNodeService() {
        val serviceIntent = Intent(this, NodeService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Android 8.0+ 必须使用前台服务启动
            startForegroundService(serviceIntent)
        } else {
            // 低版本直接启动服务
            startService(serviceIntent)
        }
    }
    /**
     * 配置WebView的各种设置和客户端
     */
    private fun setupWebView() {
        // 配置WebView设置
        val webSettings = webView.settings
        webSettings.javaScriptEnabled = true // 启用JavaScript
        webSettings.domStorageEnabled = true // 启用DOM存储
        webSettings.allowFileAccess = true // 允许访问文件
        webSettings.allowContentAccess = true // 允许内容访问
        webSettings.setSupportZoom(true) // 支持缩放
        webSettings.builtInZoomControls = true // 内置缩放控件
        webSettings.displayZoomControls = false // 不显示缩放控件
        webSettings.useWideViewPort = true // 支持宽视图
        webSettings.loadWithOverviewMode = true // 适应屏幕
        webSettings.defaultTextEncodingName = "UTF-8" // 默认编码
        
        // 设置WebView客户端，处理页面加载
        webView.webViewClient = object : WebViewClient() {
            // 处理页面跳转
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false
                
                // 如果是外部链接（如mailto, tel等），使用系统浏览器打开
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    view?.loadUrl(url)
                    return true
                } else {
                    try {
                        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                        startActivity(intent)
                        return true
                    } catch (e: Exception) {
                        return false
                    }
                }
            }
            
            // 页面加载完成
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                //swipeRefreshLayout.isRefreshing = false // 停止刷新动画
            }
        }
        
        // 设置Chrome客户端，处理进度和弹窗
        webView.webChromeClient = object : WebChromeClient() {
        }
    }

    // 处理返回键事件
    override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
        // 如果按下返回键且WebView可以返回上一页
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack()
            return true
        }
        return super.onKeyDown(keyCode, event)
    }

    // 保存WebView状态
    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    // 恢复WebView状态
    override fun onRestoreInstanceState(savedInstanceState: Bundle) {
        super.onRestoreInstanceState(savedInstanceState)
        webView.restoreState(savedInstanceState)
    }

    // 生命周期管理
    override fun onPause() {
        webView.onPause()
        super.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onDestroy() {
        (webView.parent as? android.view.ViewGroup)?.removeView(webView)
        webView.destroy()
        super.onDestroy()
    }
}
