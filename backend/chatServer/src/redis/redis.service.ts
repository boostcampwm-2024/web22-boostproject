import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Cluster } from 'ioredis';
import Redis from 'ioredis';
import { REDIS_CONFIG } from './redis.config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private cluster!: Cluster;

  async onModuleInit() {
    try {
      this.cluster = new Redis.Cluster(REDIS_CONFIG.clusters, {
        clusterRetryStrategy: (times) => {
          const delay = Math.min(times * 100, 2000);
          this.logger.log(`Retrying cluster connection after ${delay}ms...`);
          return delay;
        },
        ...REDIS_CONFIG.options,
      });

      this.cluster.on('connect', () => {
        this.logger.log('Successfully connected to Redis Cluster');
      });

      this.cluster.on('error', (error) => {
        this.logger.error('Redis Cluster Error:', error);
      });

      this.cluster.on('node:error', (error, node) => {
        this.logger.error(`Redis Cluster Node Error (${node.options.host}:${node.options.port}):`, error);
      });

      this.cluster.on('node:added', (node) => {
        this.logger.log(`Node added to cluster: ${node.options.host}:${node.options.port}`);
      });

      this.cluster.on('node:removed', (node) => {
        this.logger.log(`Node removed from cluster: ${node.options.host}:${node.options.port}`);
      });
    } catch (error) {
      this.logger.error('Failed to initialize Redis Cluster:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.cluster.quit();
    this.logger.log('Redis Cluster connection closed');
  }

  getClient(): Cluster {
    return this.cluster;
  }
}
