import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PRODUCT_SERVICE_NAME,
  PRODUCT_PACKAGE_NAME,
} from '@protos/pbs/protos/product.pb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    // ClientsModule.register([
    //   {
    //     name: PRODUCT_SERVICE_NAME,
    //     ...productClient,
    //   },
    // ]),
    ClientsModule.registerAsync([
      {
        name: PRODUCT_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const services = configService.get('ORDER_SERVICE.services');
          return {
            transport: Transport.GRPC,
            options: {
              package: PRODUCT_PACKAGE_NAME,
              protoPath: path.join(__dirname, './protos/product.proto'),
              url: `${services['product-service'].host}:${services['product-service'].port}`,
            },
          };
        },
      },
    ]),
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
