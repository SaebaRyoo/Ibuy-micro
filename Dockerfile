FROM node:20-alpine as builder

WORKDIR /home/app/

COPY package.json .
# COPY yarn.lock .

# 安装 build 依赖
RUN apk --virtual build-dependencies add git \
    && npm run proto:install \
    && npm install --legacy-peer-deps \
    && apk del build-dependencies

COPY . .

RUN npm run build:gateway
# Step 2: 运行时使用更精简的基础镜像
FROM node:20-alpine

WORKDIR /home/app

# 从builder阶段复制构建好的文件
COPY --from=builder /home/app/dist ./dist
COPY --from=builder /home/app/node_modules ./node_modules

EXPOSE 3002

CMD ["node", "./dist/apps/api-gateway/main.js"]

