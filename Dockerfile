FROM node:20
WORKDIR /app
COPY . .
EXPOSE 8080
ENTRYPOINT ["node"]
CMD ["-e", "require('./index.js')"]
