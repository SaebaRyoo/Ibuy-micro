import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { ORDER_PACKAGE_NAME } from 'libs/protos-ts/order.pb';
import { getConfig } from '../config/configuration';

async function bootstrap() {
  const config = getConfig();
  const host = config.services['order-service'].host;
  const port = config.services['order-service'].port;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ORDER_PACKAGE_NAME,
        protoPath: path.join(__dirname, './protos/order.proto'),
        url: `${host}:${port}`,
      },
    },
  );
  await app.listen();

  // TODO: TypeError: metatype is not a constructor
  // https://github.com/nestjs/nest/issues/2343

  // const app = await NestFactory.createApplicationContext(OrderServiceModule);
  // const config = app.get(ConfigService);
  // const services = config.get('ORDER_SERVICE.services');
  // console.log('services--->', services['order-service']);
  // const microservice = await NestFactory.createMicroservice(app, {
  //   transport: Transport.GRPC,
  //   options: {
  //     package: order.ORDER_PACKAGE_NAME,
  //     protoPath: path.join(__dirname, './protos/test.proto'),
  //     url: `${services['order-service'].host}:${services['order-service'].port}`,
  //   },
  // });

  // await microservice.listen();
}
bootstrap();
