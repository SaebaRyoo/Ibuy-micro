import { Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateOrderResponse } from '@protos/pbs/protos/order.pb';
import { ConfigService } from '@nestjs/config';
@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private readonly configService: ConfigService,
  ) {}

  @Post('order')
  createOrder(): Promise<CreateOrderResponse> {
    const dbUser = this.configService.get<string>('API_GATEWAY.DATABASE_USER');
    console.log('dbUser--->', dbUser);
    const data = {
      productId: 1,
      quantity: 1,
      userId: 1,
    };
    return this.apiGatewayService.createOrder(data);
  }
}
