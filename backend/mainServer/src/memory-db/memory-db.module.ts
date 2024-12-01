import { Module } from '@nestjs/common';
import { MemoryDBService, MemoryDBManager } from './memory-db.service.js';

@Module({
  providers: [MemoryDBService, MemoryDBManager],
  exports: [MemoryDBService, MemoryDBManager],
})
export class MemoryDBModule {}
