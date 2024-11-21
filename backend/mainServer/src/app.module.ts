import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HostModule } from './host/host.module.js';
import { StreamsModule } from './streams/streams.module.js';
import { MockDataModule } from './mock-data/mock-data.module.js';
import { MemoryDBModule } from './memory-db/memory-db.module.js';

@Module({
  imports: [HostModule, StreamsModule, MockDataModule, MemoryDBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


