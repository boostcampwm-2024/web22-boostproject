import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Cluster } from 'ioredis';
import { ServerOptions } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors(); // CORS 설정 (웹 클라이언트와의 연결을 허용)
  const redisAdapter = createRedisClusterAdapter();
  app.useWebSocketAdapter(redisAdapter);
  await app.listen(4000);
}

// Redis 클러스터 어댑터 생성 함수
function createRedisClusterAdapter() {
  // Redis 클러스터 초기 노드 설정
  const cluster = new Cluster([
    { host: 'redisc-2vucs8.vpc-cdb.ntruss.com', port: 6379 },
    { host: 'redisc-2vucsb.vpc-cdb.ntruss.com', port: 6379 },
    { host: 'redisc-2vucse.vpc-cdb.ntruss.com', port: 6379 },
  ]);

  // 연결 테스트
  cluster.on('connect', () => {
    console.log('Connected to Redis cluster successfully');
  });

  cluster.on('ready', () => {
    console.log('Redis cluster is ready for operations');
  });

  cluster.on('error', (err) => {
    console.error('Error connecting to Redis cluster:', err);
  });

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
