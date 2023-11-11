import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@common/filters/http.exception.filter';
import { BaseExceptionFilter } from '@common/filters/base.exception.filter';
import { getConfig } from '../config/configuration';

async function bootstrap() {
  const config = getConfig();
  const host = config.services['api-gateway'].host;
  const port = config.services['api-gateway'].port;
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new BaseExceptionFilter(), new HttpExceptionFilter());
  await app.listen(port);
}
bootstrap();
