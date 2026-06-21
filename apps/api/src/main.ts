import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';  
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3301);
  console.log(`🚀 API running on http://localhost:${process.env.PORT}/api`);
}

bootstrap();
