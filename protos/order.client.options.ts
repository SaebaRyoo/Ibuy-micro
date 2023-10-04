import { ClientOptions, Transport } from '@nestjs/microservices';
import { order } from './pbs';
import * as path from 'path';
import * as process from 'process';

export const orderClient: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: order.ORDER_PACKAGE_NAME,
    protoPath: path.join(process.cwd(), './protos/order.proto'),
    url: 'localhost:50001',
  },
};
