import { Module } from '@nestjs/common';
import { ReplayService } from './replay.service.js';
import { ReplayController } from './replay.controller.js';
import { MemoryDBModule } from '../memory-db/memory-db.module.js';

@Module({
  imports: [MemoryDBModule],
  controllers: [ReplayController],
  providers: [ReplayService],
})
export class ReplayModule {}
