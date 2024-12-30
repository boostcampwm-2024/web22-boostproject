import { Injectable } from '@nestjs/common';
import { RedisClientFactory } from './redis-client.factory';
import { createAdapter } from '@socket.io/redis-adapter';

@Injectable()
export class RedisAdapterFactory {
  constructor(private readonly redisClient: RedisClientFactory) {}

  createAdapter() {
    const pubClient = this.redisClient.createClient();
    const subClient = this.redisClient.createClient();
    return createAdapter(pubClient, subClient);
  }
}
