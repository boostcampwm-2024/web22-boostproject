import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Cluster } from 'ioredis';
import { ServerOptions } from 'socket.io';

async function bootstrap() {
  // app.enableCors(); // CORS 설정 (웹 클라이언트와의 연결을 허용)
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}

bootstrap();
