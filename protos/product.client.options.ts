import { ClientOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import * as process from 'process';
import { PRODUCT_PACKAGE_NAME } from './pbs/protos/product.pb';

export const productClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: PRODUCT_PACKAGE_NAME,
    protoPath: path.join(process.cwd(), './protos/product.proto'),
    url: 'localhost:50003',
  },
};
