import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupSwagger } from './common/swagger.js';
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  app.use(json({ limit: '200mb' }));
  app.use(urlencoded({ limit: '200mb', extended: true}));

  app.enableCors({
    origin: '*', // 프론트엔드 URL로 설정
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 필요에 따라 true로 설정
  });

  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
