import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseExceptionFilter } from './filters/response-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const port = config.port;

  app.useGlobalFilters(new ResponseExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log('server running on port', port);
}
bootstrap();
