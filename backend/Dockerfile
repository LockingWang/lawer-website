# Railway／自管 Docker：Root Directory 設為 backend 時使用此檔為 Dockerfile path。
# 建置脈絡為 backend/ 目錄（勿依賴 repo 根之 package-lock）。
FROM node:20-alpine
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY src ./src

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "src/server.js"]
