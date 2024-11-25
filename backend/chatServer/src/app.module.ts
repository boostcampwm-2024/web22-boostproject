import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { RedisService } from './redis/redis.service';


@Module({
  imports: [ChatModule],
  providers: [RedisService],
})
export class AppModule {}
