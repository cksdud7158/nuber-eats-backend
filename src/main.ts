import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // cors 허락
  app.enableCors();
  // app.use(JwtMiddleware); // function 만 사용가능
  await app.listen(4000);
}
bootstrap();
