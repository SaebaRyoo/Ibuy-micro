import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { orderClient } from '@protos/order.client.options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    orderClient,
  );
  await app.listen();
}
bootstrap();
