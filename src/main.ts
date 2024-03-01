import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppInterceptor } from './interceptors/app.interceptor';
import { HttpExceptionFilter } from './HttpException/app.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new AppInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8090);
}
bootstrap();
