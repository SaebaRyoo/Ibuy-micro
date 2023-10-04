import { Controller, Get } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import {
  CreateOrderResponse,
  ORDER_SERVICE_NAME,
} from '../../../protos/pbs/protos/order.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @GrpcMethod(ORDER_SERVICE_NAME)
  createOrder(): Promise<CreateOrderResponse> {
    return this.orderServiceService.createOrder('1');
  }
}
