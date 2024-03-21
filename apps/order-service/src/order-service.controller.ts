import { Controller, Get, Inject } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { CreateOrderResponse, ORDER_SERVICE_NAME } from '@protos/order.pb';
import { GrpcMethod } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @GrpcMethod(ORDER_SERVICE_NAME)
  createOrder(): Promise<CreateOrderResponse> {
    const postgresql = this.configService.get('ORDER_SERVICE.db.postgresql');
    console.log('postgresql--->', postgresql);
    return this.orderServiceService.createOrder('1');
  }
}
