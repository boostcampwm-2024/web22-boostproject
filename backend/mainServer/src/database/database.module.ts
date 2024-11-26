import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service.js';
import { MemoryDBModule } from '../memory-db/memory-db.module.js';

@Module({
  imports: [MemoryDBModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
