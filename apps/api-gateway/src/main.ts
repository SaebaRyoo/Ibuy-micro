import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { HttpExceptionFilter } from '@common/filters/http.exception.filter';
import { BaseExceptionFilter } from '@common/filters/base.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new BaseExceptionFilter(), new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
