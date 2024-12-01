import { Module } from '@nestjs/common';
import { StreamsController } from './streams.controller.js';
import { StreamsService } from './streams.service.js';
import { MemoryDBModule } from '../memory-db/memory-db.module.js';

@Module({
  imports : [MemoryDBModule],
  controllers: [StreamsController],
  providers: [StreamsService]
})
export class StreamsModule {}
