const fs = require('fs');
const http = require('http');
const { spawn, execSync } = require('child_process');

// ===== 你的个人参数 =====
const UUID = "2c11bde0-fa06-4438-9ff0-f8502faf6aa3";
const ARGO_TOKEN = "eyJhIjoiN2FhOWNmYTFkMDViOGYwMjY4NzYwNzRkNzBkNjI3MTgiLCJ0IjoiOGU0ODQ4OGYtOTNkMi00ZTFiLTk4ZmYtOTc0ZGJhMjNlYzUzIiwicyI6IlpUQTJPVEF4WkRjdE1tVTJaQzAwTmpjeUxXRTRORFV0TnpNNE9HRTBZVFk1Tm1NdyJ9";
const PORT = 8080;
const WS_PATH = "/vless";

// 保活 HTTP 服务（读取系统分配的 Web 端口）
const webPort = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Sing-box & Cloudflare Argo Node is Running Successfully!');
}).listen(webPort);

async function main() {
    console.log("==================================================");
    console.log(" 正在容器中启动 Sing-box & Cloudflare Argo... ");
    console.log("==================================================");

    // 1. 自动下载 Sing-box (如果不存在)
    if (!fs.existsSync('./sing-box')) {
        console.log("[+] 正在自动下载 Sing-box 二进制程序...");
        try {
            execSync('curl -sL "https://github.com/SagerNet/sing-box/releases/download/v1.9.3/sing-box-1.9.3-linux-amd64.tar.gz" -o sb.tar.gz');
            execSync('tar -xzf sb.tar.gz');
            execSync('mv sing-box-1.9.3-linux-amd64/sing-box ./sing-box');
            execSync('rm -rf sb.tar.gz sing-box-1.9.3-linux-amd64');
            console.log("[✓] Sing-box 下载解压成功");
        } catch (e) {
            console.error("下载 Sing-box 失败:", e.message);
        }
    }

    // 2. 自动下载 cloudflared (如果不存在)
    if (!fs.existsSync('./cloudflared')) {
        console.log("[+] 正在自动下载 cloudflared 二进制程序...");
        try {
            execSync('curl -sL "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64" -o cloudflared');
            console.log("[✓] cloudflared 下载成功");
        } catch (e) {
            console.error("下载 cloudflared 失败:", e.message);
        }
    }

    // 3. 生成 config.json
    const singboxConfig = {
        "log": { "level": "info", "timestamp": true },
        "inbounds": [{
            "type": "vless",
            "tag": "vless-in",
            "listen": "127.0.0.1",
            "listen_port": PORT,
            "users": [{ "uuid": UUID, "flow": "" }],
            "transport": { "type": "ws", "path": WS_PATH }
        }],
        "outbounds": [{ "type": "direct", "tag": "direct" }]
    };
    fs.writeFileSync('./config.json', JSON.stringify(singboxConfig, null, 2));

    // 4. 赋予可执行权限
    try { execSync('chmod +x ./sing-box ./cloudflared'); } catch (e) {}

    // 5. 启动服务
    console.log("[+] 正在拉起 Sing-box...");
    const sb = spawn('./sing-box', ['run', '-c', './config.json']);
    sb.stdout.on('data', d => console.log(`[Sing-box] ${d.toString().trim()}`));

    console.log("[+] 正在拉起 Cloudflare Argo 隧道...");
    const argo = spawn('./cloudflared', ['tunnel', '--no-autoupdate', 'run', '--token', ARGO_TOKEN]);
    argo.stdout.on('data', d => console.log(`[Argo] ${d.toString().trim()}`));

    process.on('SIGINT', () => { sb.kill(); argo.kill(); process.exit(); });
    process.on('SIGTERM', () => { sb.kill(); argo.kill(); process.exit(); });
}

main();
