import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(); // CORS 설정 (웹 클라이언트와의 연결을 허용)
  await app.listen(4000);
}

bootstrap();
