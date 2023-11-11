import { NestFactory } from '@nestjs/core';
import { OrderServiceModule } from './order-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { order } from '@protos/pbs';
import { getConfig } from '../config/configuration';

async function bootstrap() {
  // const configService = new ConfigService();
  // console.log(configService.get('ORDER_SERVICE.services'));
  const config = getConfig();
  const host = config.services['order-service'].host;
  const port = config.services['order-service'].port;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: order.ORDER_PACKAGE_NAME,
        protoPath: path.join(process.cwd(), './protos/order.proto'),
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
  //     protoPath: path.join(process.cwd(), './protos/test.proto'),
  //     url: `${services['order-service'].host}:${services['order-service'].port}`,
  //   },
  // });

  // await microservice.listen();
}
bootstrap();
