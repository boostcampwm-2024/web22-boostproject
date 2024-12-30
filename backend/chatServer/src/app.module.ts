import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [ChatModule, RoomModule, UserModule, RedisModule],
  providers: [],
})
export class AppModule {
}
