import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser(process.env.jwt_secret));
  await app.listen(3001);
}
bootstrap();
