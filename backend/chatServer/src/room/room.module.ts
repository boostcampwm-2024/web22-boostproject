import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRepository } from './room.repository';
import { UserModule } from '../user/user.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [UserModule, RedisModule],
  providers: [RoomService, RoomRepository],
  exports: [RoomService, RoomRepository],
})
export class RoomModule {}
