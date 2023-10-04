import { Module } from '@nestjs/common';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { ClientsModule } from '@nestjs/microservices';
import { PRODUCT_SERVICE_NAME } from '../../../protos/pbs/protos/product.pb';
import { productClient } from '../../../protos/product.client.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        ...productClient,
      },
    ]),
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
