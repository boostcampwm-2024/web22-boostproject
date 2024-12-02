import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';

@Module({
  providers: [RoomService, RoomRepository],
  exports: [RoomService, RoomRepository],
})
export class RoomModule {}
