# 使用包含 curl 和 tar 的官方 Node.js 20 镜像
FROM node:20

# 设置容器内的工作目录
WORKDIR /app

# 复制项目里的所有文件到容器中
COPY . .

# 暴露 8080 端口
EXPOSE 8080

# 启动运行根目录下的 index.js
CMD ["node", "index.js"]
