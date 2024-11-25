import { Module } from '@nestjs/common';
import { ChatGateway, checkHostUser, checkValidUser } from './chat.gateway';
import { RoomService } from '../room/room.service';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [],
  providers: [ChatGateway, checkValidUser, checkHostUser, RoomService, RedisService],
})
export class ChatModule {}
