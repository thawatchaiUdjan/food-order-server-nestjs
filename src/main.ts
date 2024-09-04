import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseExceptionFilter } from './filters/response-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const port = config.get<number>('port');

  app.useGlobalFilters(new ResponseExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log('server running on port', port);
}
bootstrap();
