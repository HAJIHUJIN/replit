const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

// ===== 你的个人参数 =====
const UUID = "2c11bde0-fa06-4438-9ff0-f8502faf6aa3";
const ARGO_TOKEN = "eyJhIjoiN2FhOWNmYTFkMDViOGYwMjY4NzYwNzRkNzBkNjI3MTgiLCJ0IjoiOGU0ODQ4OGYtOTNkMi00ZTFiLTk4ZmYtOTc0ZGJhMjNlYzUzIiwicyI6IlpUQTJPVEF4WkRjdE1tVTJaQzAwTmpjeUxXRTRORFV0TnpNNE9HRTBZVFk1Tm1NdyJ9";
const PORT = 8080;
const WS_PATH = "/vless";

// Vercel 专用可写临时目录 /tmp
const TMP_DIR = '/tmp';
const SINGBOX_PATH = path.join(TMP_DIR, 'sing-box');
const CLOUDFLARED_PATH = path.join(TMP_DIR, 'cloudflared');
const CONFIG_PATH = path.join(TMP_DIR, 'config.json');

let isRunning = false;

async function startNode() {
    if (isRunning) return;
    isRunning = true;

    console.log("==================================================");
    console.log(" 正在在 Vercel /tmp 目录拉起 Sing-box & Argo... ");
    console.log("==================================================");

    // 1. 下载 Sing-box 到 /tmp 目录
    if (!fs.existsSync(SINGBOX_PATH)) {
        console.log("[+] 正在下载 Sing-box 到 /tmp...");
        try {
            execSync(`curl -sL "https://github.com/SagerNet/sing-box/releases/download/v1.9.3/sing-box-1.9.3-linux-amd64.tar.gz" -o ${TMP_DIR}/sb.tar.gz`);
            execSync(`tar -xzf ${TMP_DIR}/sb.tar.gz -C ${TMP_DIR}`);
            execSync(`mv ${TMP_DIR}/sing-box-1.9.3-linux-amd64/sing-box ${SINGBOX_PATH}`);
            execSync(`rm -rf ${TMP_DIR}/sb.tar.gz ${TMP_DIR}/sing-box-1.9.3-linux-amd64`);
            console.log("[✓] Sing-box 下载解压成功");
        } catch (e) {
            console.error("下载 Sing-box 失败:", e.message);
        }
    }

    // 2. 下载 cloudflared 到 /tmp 目录
    if (!fs.existsSync(CLOUDFLARED_PATH)) {
        console.log("[+] 正在下载 cloudflared 到 /tmp...");
        try {
            execSync(`curl -sL "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64" -o ${CLOUDFLARED_PATH}`);
            console.log("[✓] cloudflared 下载成功");
        } catch (e) {
            console.error("下载 cloudflared 失败:", e.message);
        }
    }

    // 3. 生成 /tmp/config.json 配置文件
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
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(singboxConfig, null, 2));

    // 4. 赋予可执行权限
    try { execSync(`chmod +x ${SINGBOX_PATH} ${CLOUDFLARED_PATH}`); } catch (e) {}

    // 5. 后台拉起进程
    console.log("[+] 启动 Sing-box...");
    spawn(SINGBOX_PATH, ['run', '-c', CONFIG_PATH], { stdio: 'inherit' });

    console.log("[+] 启动 Argo 隧道...");
    spawn(CLOUDFLARED_PATH, ['tunnel', '--no-autoupdate', 'run', '--token', ARGO_TOKEN], { stdio: 'inherit' });
}

// 6. 导出 Vercel 标准响应入口 (解决 no files were prepared 的核心代码)
module.exports = async (req, res) => {
    try {
        await startNode();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.status(200).send("<h1>Vercel Sing-box & Argo 节点正常运行中！</h1>");
    } catch (e) {
        res.status(500).send("服务启动失败: " + e.message);
    }
};
