import { DatabaseService } from './database.service.js';
import { MemoryDBModule } from '../memory-db/memory-db.module.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplayVideoEntity } from '../entity/replayVideoEntity.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('../.env') });

@Module({
  imports: [MemoryDBModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      entities: [ReplayVideoEntity],
      synchronize: true, // 개발 환경에서만 사용
    }),
    TypeOrmModule.forFeature([ReplayVideoEntity]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
