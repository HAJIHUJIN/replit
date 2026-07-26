# 1. 使用官方 Node.js 20 作为基础镜像
FROM node:20

# 2. 安装基础依赖
RUN apt-get update && apt-get install -y curl tar wget

# 3. 设置容器内的工作目录
WORKDIR /app

# 4. 在构建镜像阶段直接下载并解压好 sing-box（避免运行阶段被 GitHub 阻拦拦截）
RUN curl -sL "https://github.com/SagerNet/sing-box/releases/download/v1.9.3/sing-box-1.9.3-linux-amd64.tar.gz" -o sb.tar.gz && \
    tar -xzf sb.tar.gz && \
    mv sing-box-1.9.3-linux-amd64/sing-box ./sing-box && \
    rm -rf sb.tar.gz sing-box-1.9.3-linux-amd64

# 5. 在构建镜像阶段直接下载 cloudflared
RUN curl -sL "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64" -o ./cloudflared

# 6. 提前赋予可执行权限
RUN chmod +x ./sing-box ./cloudflared

# 7. 复制你的 index.js 和 package.json（你的混淆代码不需要做任何改动！）
COPY . .

# 8. 暴露 8080 端口
EXPOSE 8080

# 9. 直接运行
CMD ["node", "index.js"]
