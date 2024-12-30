import { Module } from '@nestjs/common';
import { RedisAdapterFactory } from './redis-adapter.factory';
import { RedisClientFactory } from './redis-client.factory';

@Module({
  providers: [RedisAdapterFactory, RedisClientFactory],
  exports: [RedisAdapterFactory, RedisClientFactory],
})
export class RedisModule {}
