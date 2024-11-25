import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HostModule } from './host/host.module.js';
import { StreamsModule } from './streams/streams.module.js';
import { MockDataModule } from './mock-data/mock-data.module.js';
import { MemoryDBModule } from './memory-db/memory-db.module.js';
import { ReplayModule } from './replay/replay.module.js';

@Module({
  imports: [MemoryDBModule, HostModule, StreamsModule, ReplayModule, MockDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


