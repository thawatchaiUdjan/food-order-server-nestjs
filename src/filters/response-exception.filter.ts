import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;
      response.status(status).json({ message: message });
      console.log('Error:', exception.getResponse());
    } else {
      response.status(500).json({
        message: 'An unexpected error occurred. Please try again later',
      });
    }
  }
}
