import { Module } from '@nestjs/common';
import { HostController } from './host.controller.js';
import { HostService } from './host.service.js';
import { MemoryDBModule } from '../memory-db/memory-db.module.js';

@Module({
  imports:[MemoryDBModule],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
