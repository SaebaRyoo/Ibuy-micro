import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_SERVICE_NAME, ProductServiceClient } from '@protos/product.pb';
import { CreateOrderResponse } from '@protos/order.pb';

@Injectable()
export class OrderServiceService implements OnModuleInit {
  productServiceClient: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  readonly clientGrpc: ClientGrpc;

  public onModuleInit(): any {
    this.productServiceClient =
      this.clientGrpc.getService(PRODUCT_SERVICE_NAME);
  }

  async createOrder(productId: string): Promise<CreateOrderResponse> {
    // TODO: 调用product 微服务 rpc, 完成库存变化

    const data = { id: 1, orderId: 2 };
    const response = await firstValueFrom(
      this.productServiceClient.decreaseStock(data),
    );

    if (response.status === 200) {
      return {
        ...response,
        status: 200,
        id: 1,
      };
    }

    // const stock =
    return {
      status: 500,
      error: [],
      id: 2,
    };
  }
}
