import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomModule } from '../room/room.module';
import { MessageGuard } from './chat.guard';

@Module({
  imports: [RoomModule],
  providers: [ChatGateway, MessageGuard],
})
export class ChatModule {}
