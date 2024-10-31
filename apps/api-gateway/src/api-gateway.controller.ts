import { Controller, Get, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { CreateOrderResponse } from '@libs/protos-ts/order.pb';

// import { CreateOrderResponse } from 'Ibuy-protos/protos/pbs/index.order';
import { ConfigService } from '@nestjs/config';
import Result from '@libs/common/utils/Result';
@Controller()
export class ApiGatewayController {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    private readonly configService: ConfigService,
  ) {}

  @Post('order')
  async createOrder(): Promise<Result<CreateOrderResponse>> {
    const dbUser = this.configService.get<string>('API_GATEWAY.DATABASE_USER');
    console.log('dbUser--->', dbUser);
    const data = {
      productId: 1,
      quantity: 1,
      userId: 1,
    };
    const result = await this.apiGatewayService.createOrder(data);
    return new Result(result);
  }
}
