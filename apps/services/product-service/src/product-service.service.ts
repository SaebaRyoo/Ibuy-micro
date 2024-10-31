import { Injectable } from '@nestjs/common';
import { DecreaseStockResponse } from 'libs/protos-ts/product.pb';

@Injectable()
export class ProductServiceService {
  async decreaseStock(): Promise<DecreaseStockResponse> {
    return {
      status: 200,
      error: ['a', 'b', 'c'],
    };
  }
}
