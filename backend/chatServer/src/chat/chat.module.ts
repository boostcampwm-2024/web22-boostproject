import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { RoomModule } from '../room/room.module';
import { BlacklistGuard, HostGuard, MessageGuard } from './chat.guard';

@Module({
  imports: [RoomModule],
  providers: [ChatGateway, MessageGuard, BlacklistGuard, HostGuard],
})
export class ChatModule {}
