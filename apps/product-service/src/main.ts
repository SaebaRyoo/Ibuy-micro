import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { getConfig } from '../config/configuration';
import { Transport } from '@nestjs/microservices';
import * as path from 'path';
import { PRODUCT_PACKAGE_NAME } from '@protos/product.pb';

async function bootstrap() {
  const config = getConfig();
  console.log('config--->', config);
  const host = config.services['product'].host;
  const port = config.services['product'].port;
  const app = await NestFactory.createMicroservice(ProductServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_PACKAGE_NAME,
      protoPath: path.join(__dirname, './protos/product.proto'),
      url: `${host}:${port}`,
    },
  });
  await app.listen();
}
bootstrap();
