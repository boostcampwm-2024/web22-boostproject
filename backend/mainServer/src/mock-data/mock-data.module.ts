import { Module } from '@nestjs/common';
import { MockDataController } from './mock-data.controller.js';
import { MemoryDBModule } from '../memory-db/memory-db.module.js';
import { MockDataService } from './mock-data.service.js';

@Module({
  imports: [MemoryDBModule],
  controllers: [MockDataController],
  providers: [MockDataService],
})
export class MockDataModule {}
