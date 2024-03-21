# 如何启动

## 安装包

`npm install` 或者 `yarn`


## 安装 proto

`yarn run proto:install`

## 基于**protobuf schema**生成 TypeScript 类型。

`yarn run proto:all`

## 运行各个微服务

比如

- 运行 **api-gateway**, `yarn run start:dev api-gateway`
- 运行 **order-service**, `yarn run start:dev order-service`
- 运行 **product-service**, `yarn run start:dev product-service`
