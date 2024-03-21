FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json .
# COPY yarn.lock .

RUN npm install --force

COPY . .

RUN npm run build:gateway
# Step 2: 运行时使用更精简的基础镜像
FROM node:20-alpine

WORKDIR /usr/src/app

# 从builder阶段复制构建好的文件
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3002

CMD ["node", "./dist/app/api-gateway/main.js"]

