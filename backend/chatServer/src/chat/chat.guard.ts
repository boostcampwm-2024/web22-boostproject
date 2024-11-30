import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { Socket } from 'socket.io';

import { ChatException, CHATTING_SOCKET_ERROR } from './chat.error';

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

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(private roomService: RoomService) {};
  async canActivate(context: ExecutionContext) {
    const payload = context.switchToWs().getData();
    const { roomId } = payload;

    const client: Socket = context.switchToWs().getClient<Socket>();
    const address = client.handshake.address.replaceAll('::ffff:', '');
    const forwarded = client.handshake.headers.forwarded?.split(',')[0] ?? address;

    const isValidUser = await this.whenJoinRoom(roomId, address, forwarded);

    if(!isValidUser) throw new ChatException(CHATTING_SOCKET_ERROR.BAN_USER, roomId);
    return true;
  }

  async whenJoinRoom(roomId: string, address: string, forwarded: string) {
    console.log(roomId, address, forwarded);
    const blacklistInRoom = await this.roomService.getUserBlacklist(roomId, address);
    console.log(blacklistInRoom);
    const isInBlacklistUser = blacklistInRoom.some((blackForwarded) => blackForwarded === forwarded);
    console.log('blacklistInRoom:', isInBlacklistUser);
    return !isInBlacklistUser;
  }
}
