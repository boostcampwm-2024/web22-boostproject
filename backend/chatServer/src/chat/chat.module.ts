import { Module } from '@nestjs/common';
import { ChatGateway, checkHostUser, checkValidUser } from './chat.gateway';
import { RoomService } from '../room/room.service';

@Module({
  imports: [],
  providers: [ChatGateway, checkValidUser, checkHostUser, RoomService],
})
export class ChatModule {}
