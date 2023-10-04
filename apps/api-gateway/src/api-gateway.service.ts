import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  ORDER_SERVICE_NAME,
  OrderServiceClient,
} from '../../../protos/pbs/protos/order.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private orderService: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly clientGrpc: ClientGrpc;

  public onModuleInit(): any {
    this.orderService = this.clientGrpc.getService(ORDER_SERVICE_NAME);
  }

  createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    return firstValueFrom(this.orderService.createOrder(data));
  }
}
