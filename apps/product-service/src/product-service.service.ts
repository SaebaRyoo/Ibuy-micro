import { Injectable } from '@nestjs/common';
import { DecreaseStockResponse } from '../../../protos/pbs/protos/product.pb';

@Injectable()
export class ProductServiceService {
  async decreaseStock(): Promise<DecreaseStockResponse> {
    return {
      status: 200,
      error: [],
    };
  }
}
