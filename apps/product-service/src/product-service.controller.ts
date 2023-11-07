import { Controller, Get } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import {
  DecreaseStockResponse,
  PRODUCT_SERVICE_NAME,
} from '@protos/pbs/protos/product.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME)
  decreaseStock(): Promise<DecreaseStockResponse> {
    return this.productServiceService.decreaseStock();
  }
}
