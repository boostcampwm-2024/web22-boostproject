import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Cluster } from 'ioredis';
import { ServerOptions } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisAdapter = createRedisClusterAdapter();
  app.useWebSocketAdapter(redisAdapter);
  await app.listen(4000);
}

// Redis 클러스터 어댑터 생성 함수
function createRedisClusterAdapter() {
  // Redis 클러스터 초기 노드 설정
  const cluster = new Cluster([
    { host: 'liboo-redis-001-001-64s9', port: 6379 },
    { host: 'liboo-redis-002-001-64sa', port: 6379 },
    { host: 'liboo-redis-003-001-64sb', port: 6379 },
  ]);

  // Socket.IO Redis Adapter 생성
  const pubClient = cluster;
  const subClient = cluster.duplicate(); // 구독 용도로 클라이언트를 복제합니다.

  return new (class extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions) {
      const server = super.createIOServer(port, options);
      server.adapter(createAdapter(pubClient, subClient));
      return server;
    }
  })();
}

bootstrap();
