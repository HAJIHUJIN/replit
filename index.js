// index.js - 修复左对齐错位版
const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');
const { WebSocketServer } = require('ws');

const PORT = process.env.PORT || 8080;
const PASSWORD = "admin";

const getHtml = (authenticated) => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>Node.js Web Shell</title>
    ${authenticated ? `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterm@5.3.0/css/xterm.css" />
    <script src="https://cdn.jsdelivr.net/npm/xterm@5.3.0/lib/xterm.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/xterm-addon-fit@0.8.0/lib/xterm-addon-fit.js"></script>
    <style>html, body { margin:0; padding:0; background:#1e1e1e; height:100%; overflow:hidden; } #terminal { width:100vw; height:100vh; }</style>
    ` : `
    <style>
        body { margin:0; background:#181818; color:#fff; font-family:sans-serif; display:flex; height:100vh; align-items:center; justify-content:center; }
        .box { background:#252525; padding:30px; border-radius:8px; width:300px; text-align:center; }
        input { width:90%; padding:10px; margin:15px 0; border:1px solid #444; background:#333; color:#fff; border-radius:4px; font-size:16px; }
        button { width:98%; padding:10px; background:#007acc; border:none; color:#fff; border-radius:4px; font-size:16px; cursor:pointer; }
    </style>
    `}
</head>
<body>
    ${authenticated ? `
    <div id="terminal"></div>
    <script>
        const term = new Terminal({ cursorBlink: true, fontSize: 15, theme: { background: '#1e1e1e', foreground: '#ffffff' } });
        const fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        term.open(document.getElementById('terminal'));
        fitAddon.fit();

        const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(protocol + '//' + location.host);

        ws.onopen = () => term.write('\\r\\n\\x1b[1;32m*** 已成功进入 Node.js 网页 Shell 终端 ***\\x1b[0m\\r\\n\\r\\n');
        ws.onmessage = (e) => term.write(e.data);
        ws.onclose = () => term.write('\\r\\n\\x1b[1;31m*** 终端连接已断开 ***\\x1b[0m\\r\\n');

        term.onData(data => { if (ws.readyState === WebSocket.OPEN) ws.send(data); });
        window.onresize = () => fitAddon.fit();
    </script>
    ` : `
    <div class="box">
        <h2>Node.js Web Shell</h2>
        <form method="POST">
            <input type="password" name="password" placeholder="密码: admin" required />
            <button type="submit">登 录</button>
        </form>
    </div>
    `}
</body>
</html>
`;

const server = http.createServer((req, res) => {
    let cookies = req.headers.cookie || '';
    let isAuth = cookies.includes(`auth=${PASSWORD}`);

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            if (body.includes(`password=${PASSWORD}`)) {
                res.writeHead(302, { 'Set-Cookie': `auth=${PASSWORD}; Path=/; HttpOnly`, 'Location': '/' });
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(getHtml(false) + '<script>alert("密码错误！默认密码是: admin");</script>');
            }
        });
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHtml(isAuth));
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    const shell = process.platform === 'win32'
        ? 'cmd.exe'
        : (fs.existsSync('/bin/bash') ? '/bin/bash' : '/bin/sh');

    const pty = spawn(shell, ['-i'], {
        env: { ...process.env, TERM: 'xterm-256color' }
    });

    // 核心修复：把普通的 \n 强制转换为终端标准的 \r\n，实现完美左对齐
    const formatText = (data) => data.toString().replace(/\r?\n/g, '\r\n');

    pty.stdout.on('data', data => ws.readyState === ws.OPEN && ws.send(formatText(data)));
    pty.stderr.on('data', data => ws.readyState === ws.OPEN && ws.send(formatText(data)));
    ws.on('message', msg => pty.stdin.write(msg));
    ws.on('close', () => pty.kill());
});

server.listen(PORT, () => {
    console.log(`[Node.js Web Shell] 运行在端口 ${PORT}`);
});