import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomModule } from '../room/room.module';
import { BlacklistGuard, HostGuard, MessageGuard } from './chat.guard';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RoomModule, RedisModule],
  providers: [ChatGateway, MessageGuard, BlacklistGuard, HostGuard],
})
export class ChatModule {}
