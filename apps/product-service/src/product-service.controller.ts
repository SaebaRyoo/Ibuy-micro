import { Controller, Get } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  DecreaseStockResponse,
  PRODUCT_SERVICE_NAME,
} from '@protos/product.pb';

@Controller()
export class ProductServiceController {
  constructor(private readonly productServiceService: ProductServiceService) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME)
  decreaseStock(): Promise<DecreaseStockResponse> {
    return this.productServiceService.decreaseStock();
  }
}
