import { Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateOrderResponse } from '@protos/pbs/protos/order.pb';
@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Post('order')
  createOrder(): Promise<CreateOrderResponse> {
    const data = {
      productId: 1,
      quantity: 1,
      userId: 1,
    };
    return this.apiGatewayService.createOrder(data);
  }
}
