import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Cluster, Redis } from 'ioredis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 현재 파일의 URL을 파일 경로로 변환
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 상위 디렉터리의 .env 파일을 불러오기
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const REDIS_CONFIG = JSON.parse(process.env.REDIS_CONFIG!);


@Injectable()
export class RedisClientFactory implements OnModuleDestroy{
  redisClientList: Cluster[] = [];

  async onModuleDestroy(){
    if (this.redisClientList) {
      const quitPromise = this.redisClientList.map((redisClient) =>
        redisClient.quit().catch((err) => console.error(err)));
      await Promise.all(quitPromise);
      console.log('Redis connection closed');
    }
  }

  createClient() {
    const newRedisClient = new Redis.Cluster(REDIS_CONFIG);
    this.redisClientList.push(newRedisClient);
    return newRedisClient;
  }
}
