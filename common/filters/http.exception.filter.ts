import {
  HttpException,
  Catch,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const { name, message } = exception;

    console.log('into HttpExceptionFilter ....');
    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: name,
      message,
    });
  }
}
