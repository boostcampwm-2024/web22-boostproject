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
    if(!!msg && msg.length <= 150) return true;
    throw new ChatException(CHATTING_SOCKET_ERROR.MSG_TOO_LONG);
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
    if (hostId === userId) return true;
    throw new ChatException(CHATTING_SOCKET_ERROR.UNAUTHORIZED, roomId);
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
    const userAgent = client.handshake.headers['user-agent'];

    if(!userAgent) throw new ChatException(CHATTING_SOCKET_ERROR.INVALID_USER, roomId);
    const isValidUser = await this.whenJoinRoom(roomId, address, userAgent);

    if(!isValidUser) throw new ChatException(CHATTING_SOCKET_ERROR.BAN_USER, roomId);
    return true;
  }

  async whenJoinRoom(roomId: string, address: string, userAgent: string) {
    console.log(roomId, address, userAgent);
    const blacklistInRoom = await this.roomService.getUserBlacklist(roomId, address);
    console.log(blacklistInRoom);
    const isInBlacklistUser = blacklistInRoom.some((bannedUserAgent) => bannedUserAgent === userAgent);
    console.log('blacklistInRoom:', isInBlacklistUser);
    return !isInBlacklistUser;
  }
}
