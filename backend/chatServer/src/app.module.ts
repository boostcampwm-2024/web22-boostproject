import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ChatModule, RoomModule],
  providers: [],
})
export class AppModule {
}
