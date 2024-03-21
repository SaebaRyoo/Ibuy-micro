import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDER_PACKAGE_NAME,
  ORDER_SERVICE_NAME,
} from '@protos/order.pb';
// import { order } from '@protos/pbs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ClientsModule.registerAsync([
      {
        name: ORDER_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const services = configService.get('API_GATEWAY.services');
          return {
            transport: Transport.GRPC,
            options: {
              package: ORDER_PACKAGE_NAME,
              // 在根目录nest-cli.json中配置了proto文件的路径
              protoPath: path.join(__dirname, './protos/order.proto'),
              url: `${services['order-service'].host}:${services['order-service'].port}`,
              loader: {
                defaults: true,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
