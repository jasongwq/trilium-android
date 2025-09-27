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
import android.widget.ProgressBar
import androidx.appcompat.app.AppCompatActivity
import android.graphics.Color
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import android.os.Build



class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout 
    // 默认加载的网页地址
    private val defaultUrl = "http://127.0.0.1:8080"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // App启动时自动启动NodeService
        startNodeService()

        setContentView(R.layout.activity_main)
        webView = findViewById(R.id.webView)
        
        // 配置WebView
        setupWebView()
       swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout)
         // 配置WebView
         setupWebView()
         // 配置下拉刷新
         setupSwipeRefresh()
 
        // 加载网页
        if (savedInstanceState == null) {
            webView.loadUrl(defaultUrl)
        } else {
            // 恢复WebView状态
            webView.restoreState(savedInstanceState)
        }
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
    private fun setupSwipeRefresh() {
         // 设置刷新时的颜色循环（可选）
         swipeRefreshLayout.setColorSchemeResources(
             android.R.color.holo_blue_light,
             android.R.color.holo_green_light,
             android.R.color.holo_orange_light
         )
         // 设置下拉刷新的触发距离（可选）
         swipeRefreshLayout.setDistanceToTriggerSync(200)
         // 下拉刷新监听器：触发时重新加载网页
         swipeRefreshLayout.setOnRefreshListener {
             webView.reload() // 重新加载当前网页
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
                swipeRefreshLayout.isRefreshing = false // 停止刷新动画
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
        // 销毁WebView，避免内存泄漏
        webView.loadDataWithBaseURL(null, "", "text/html", "utf-8", null)
        webView.clearHistory()
        (webView.parent as? android.view.ViewGroup)?.removeView(webView)
        webView.destroy()
        super.onDestroy()
    }
}
