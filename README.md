# 如何启动

## 安装包
`npm install` 或者 `yarn`

## 基于**protobuf schema**生成 TypeScript 类型。
`yarn run proto:all`

## 运行各个微服务
比如
- 运行 **api-gateway**, `yarn run start:dev api-gateway`
- 运行 **order-service**, `yarn run start:dev order-service`
- 运行 **product-service**, `yarn run start:dev product-service`

其他服务同上。并且在运行上述脚本时，会先运行`cp-protos.sh`将根目录中 **protos** 目录下的**protobuf schema**
复制到每个微服务中，因为nestjs的微服务无法将位于微服务目录外的资源打包(nest-cli.json)到dist中。
> HINT: 该脚本只在mac中生效，windows版本暂未添加

> HINT: 如果遇到sh执行权限问题, 运行`chmod +x cp-protos.sh`