import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RoomService } from '../room/room.service';

@Injectable()
export class MessageGuard implements CanActivate {
  constructor() {};
  canActivate(context: ExecutionContext): boolean {
    const payload = context.switchToWs().getData();
    const { msg } = payload;
    return !!msg && msg.length <= 150;
  }
}

@Injectable()
export class HostGuard implements CanActivate {
  constructor(private roomService: RoomService) {};
  async canActivate(context: ExecutionContext) {
    const payload = context.switchToWs().getData();
    const { roomId, userId } = payload;
    const hostId = await this.roomService.getHostOfRoom(roomId);
    console.log('hostGuard:', hostId, userId);
    return hostId === userId;
  }
}
