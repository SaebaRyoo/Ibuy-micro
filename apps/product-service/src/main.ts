import { NestFactory } from '@nestjs/core';
import { ProductServiceModule } from './product-service.module';
import { productClient } from '../../../protos/product.client.options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ProductServiceModule,
    productClient,
  );
  await app.listen();
}
bootstrap();
