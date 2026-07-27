#!/bin/bash
mkdir -p ~/app && cd ~/app

# 1. 下载伪装核心 (如果不存在)
if [ ! -f "./node-runtime" ]; then
    curl -L https://github.com/SagerNet/sing-box/releases/download/v1.9.0/sing-box-1.9.0-linux-amd64.tar.gz -o sb.tar.gz
    tar -zxvf sb.tar.gz
    mv sing-box-1.9.0-linux-amd64/sing-box ./node-runtime
    rm -rf sb.tar.gz sing-box-1.9.0-linux-amd64
    curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o tunnel-agent
    chmod +x node-runtime tunnel-agent
fi

# 2. 生成配置文件
cat << 'EOF' > app.settings.data
{
  "log": { "level": "warn" },
  "inbounds": [
    {
      "type": "vless",
      "tag": "vless-in",
      "listen": "127.0.0.1",
      "listen_port": 8082,
      "users": [{ "uuid": "2c11bde0-fa06-4438-9ff0-f8502faf6aa3" }],
      "transport": {
        "type": "ws",
        "path": "/api/v1/stream",
        "max_early_data": 2048,
        "early_data_header_name": "Sec-WebSocket-Protocol"
      }
    }
  ],
  "outbounds": [{ "type": "direct" }]
}
EOF

# 3. 启动假网站与代理核心
python3 -m http.server 8080 > /dev/null 2>&1 &
./node-runtime run -c app.settings.data > /dev/null 2>&1 &
sleep 2

# 4. 你的 Replit 专属完全正确 Token
TOKEN="eyJhIjoiN2FhOWNmYTFkMDViOGYwMjY4NzYwNzRkNzBkNjI3MTgiLCJ0IjoiY2NhYmZjNzEtMjg1ZC00NzYyLTg3MDQtYjRiMGZkYTcwMjBiIiwicyI6Ik5USmhZelk1T0RNdE5URmlaQzAwTldJNExUa3lNMlF0TURVNE9UQXlPRE16TURJeiJ9=="

exec ./tunnel-agent tunnel --no-autoupdate run --token "$TOKEN"
