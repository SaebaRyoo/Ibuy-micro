import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  ORDER_SERVICE_NAME,
  OrderServiceClient,
} from '@protos/pbs/protos/order.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as winston from 'winston';

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private orderService: OrderServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly clientGrpc: ClientGrpc;

  public onModuleInit(): any {
    const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    );
    this.orderService = this.clientGrpc.getService(ORDER_SERVICE_NAME);
  }

  createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    return firstValueFrom(this.orderService.createOrder(data));
  }
}
