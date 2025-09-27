// 引入Node.js内置的HTTP模块
const http = require('http');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
    // 设置响应头：200表示成功，内容类型为纯文本
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // 返回"hello world"并结束响应
    res.end('hello world\n');
});

// 让服务器监听8080端口
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`服务器已启动，正在监听 ${PORT} 端口`);
    console.log(`可以通过 http://localhost:${PORT} 访问`);
});

// 捕获可能的错误
server.on('error', (err) => {
    console.error('服务器错误:', err);
});