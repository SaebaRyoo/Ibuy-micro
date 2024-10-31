# 如何启动

## 安装包

`npm install` 或者 `yarn`


## 安装 proto & 基于**protobuf schema**生成 TypeScript 类型。

`yarn run proto`

## 为各个微服务配置proto文件
比如 **order-service** 需要和 **product-service** 微服务之间通信，那么就需要将生成到根目录的libs/Ibuy-protos/protos中的product.proto文件复制到
**order-service** 目录中的 protos目录中。为了方便，直接将每次生成的 libs/Ibuy-protos/protos 目录都拷贝过去

## 运行各个微服务

比如

- 运行 **api-gateway**, `yarn run start:dev api-gateway`
- 运行 **order-service**, `yarn run start:dev order-service`
- 运行 **product-service**, `yarn run start:dev product-service`
