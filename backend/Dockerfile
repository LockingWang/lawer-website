# Google Cloud Run（GitHub Actions CI/CD）部署使用此 Dockerfile。
# 建置脈絡為 backend/ 目錄（勿依賴 repo 根之 package-lock）。
FROM node:20-alpine
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "src/server.js"]
