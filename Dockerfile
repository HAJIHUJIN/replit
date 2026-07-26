FROM node:20
RUN apt-get update && apt-get install -y curl tar wget
WORKDIR /app
RUN curl -sL "https://github.com/SagerNet/sing-box/releases/download/v1.9.3/sing-box-1.9.3-linux-amd64.tar.gz" -o sb.tar.gz && \
    tar -xzf sb.tar.gz && \
    mv sing-box-1.9.3-linux-amd64/sing-box ./sing-box && \
    rm -rf sb.tar.gz sing-box-1.9.3-linux-amd64
RUN curl -sL "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64" -o ./cloudflared
RUN chmod +x ./sing-box ./cloudflared
COPY . .
EXPOSE 8080
ENTRYPOINT ["node"]
CMD ["-e", "require('./index.js')"]
