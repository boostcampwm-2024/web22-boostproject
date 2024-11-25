import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect, WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  CHATTING_SOCKET_ERROR,
  CHATTING_SOCKET_DEFAULT_EVENT,
  CHATTING_SOCKET_RECEIVE_EVENT, CHATTING_SOCKET_SEND_EVENT
} from '../event/constants';
import { IncomingMessageDto } from '../event/dto/IncomingMessage.dto';
import { JoiningRoomDto } from '../event/dto/JoiningRoom.dto';
import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { OutgoingMessageDto } from '../event/dto/OutgoingMessage.dto';
import { User } from '../room/user.interface';
import { RoomService } from '../room/room.service';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';

@Injectable()
export class checkValidUser implements CanActivate {
  constructor(private roomService: RoomService) {};

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<Socket>();
    const payload = context.switchToWs().getData();
    const { roomId, userId } = payload;
    const room = this.roomService.getRoom(roomId);

    console.log(roomId, userId, payload, room);
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    console.log('guard', room.users);
    const user = this.roomService.getRoom(roomId)!.users.get(userId);

    // if(!user) throw new WsException(CHATTING_SOCKET_ERROR.INVALID_USER);

    console.log('guard', user , client.id , user?.clientId);
    if(!client.data.userId) client.data = {roomId, userId, ...user};
    return true;
  }
}

@Injectable()
export class checkHostUser implements CanActivate {
  constructor(private roomService: RoomService) {};

  canActivate(context: ExecutionContext): boolean {
    // const client = context.switchToWs().getClient<Socket>();
    const payload = context.switchToWs().getData();

    const { userId, roomId } = payload;
    const hostId = this.roomService.getRoom(roomId)?.hostId;
    console.log(userId, roomId, hostId, this.roomService.getRoom(roomId));
    if(userId !== hostId) throw new WsException(CHATTING_SOCKET_ERROR.INVALID_USER);
    return true;
  }
}


@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  redisAdapter: ReturnType<typeof createAdapter>;
  constructor(private roomService: RoomService) {
    // Redis 클러스터 연결 설정
    const redisClient = new Redis.Cluster([
      { host: 'redisc-2vucs8.vpc-cdb.ntruss.com', port: 6379 },
      { host: 'redisc-2vucsb.vpc-cdb.ntruss.com', port: 6379 },
      { host: 'redisc-2vucse.vpc-cdb.ntruss.com', port: 6379 },
    ]);

    // 어댑터 설정
    this.redisAdapter = createAdapter(redisClient, redisClient);
  };

  afterInit() {
    // Socket.IO 서버에 Redis 어댑터 연결
    this.server.adapter(this.redisAdapter);
  }

  @WebSocketServer()
    server!: Server;


  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.leave(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id, client.data);
    const { roomId, userId } = client.data;
    try {
      this.roomService.deleteUser(roomId, userId);
    } catch (error) {
      console.log(error);
    }
  }

  // 특정 방에 참여하기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM)
  handleJoinRoom(client: Socket, payload: JoiningRoomDto) {
    const { roomId, userId } = payload;
    client.join(roomId);

    const room = this.roomService.getRoom(roomId);
    if(!room){
      this.roomService.createRoom(roomId, userId);
    }

    console.log(`cliend id = ${ client.id }, user id = ${ userId } 가 ${roomId} 에 입장했습니다.`);
    const questionList = this.roomService.getQuestionsNotDone(roomId);

    console.log('new user join', this.roomService.createUser(roomId, userId, client.id));

    client.emit(CHATTING_SOCKET_RECEIVE_EVENT.INIT, { questionList });
  }

  // 특정 방에서 나가기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, payload: IncomingMessageDto) {
    const { roomId, userId } = payload;
    console.log('leave', roomId, userId);
    this.roomService.deleteUser(roomId, userId);
    client.leave(roomId);
  }

  // 방에 NORMAL 메시지를 보내기 위한 메서드
  @UseGuards(checkValidUser)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NORMAL)
  handleNormalMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    const user: User = client.data;
    const outgoingMessage: OutgoingMessageDto = {
      userId: payload.userId,
      nickname: user.nickname,
      color: user.color,
      msg: payload.msg,
      msgTime: new Date().toISOString(),
      msgType: 'normal',
    };
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.NORMAL, outgoingMessage);
  }

  // 방에 QUESTION 메시지를 보내기 위한 메서드
  @UseGuards(checkValidUser)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION)
  handleQuestionMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    const user: User = client.data;
    const questionWithoutNumber: Omit<OutgoingMessageDto, 'questionId'> = {
      questionDone: false,
      userId: payload.userId,
      nickname: user.nickname,
      color: user.color,
      msg: payload.msg,
      msgTime: new Date().toISOString(),
      msgType: 'question'
    };
    const newQuestion = this.roomService.addQuestionAndReturnQuestion(room, questionWithoutNumber);
    console.log(payload, newQuestion);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION, newQuestion);
  }

  // 방에 QUESTION DONE 메시지를 보내기 위한 메서드
  @UseGuards(checkValidUser)
  @UseGuards(checkHostUser)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE)
  handleQuestionDoneMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);

    const { roomId, questionId } = payload;
    if(!questionId) throw new WsException(CHATTING_SOCKET_ERROR.QUESTION_EMPTY);

    const question = this.roomService.getQuestion(roomId, questionId);
    if(!question) throw new WsException(CHATTING_SOCKET_ERROR.QUESTION_EMPTY);

    question.questionDone = true;

    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE, question);
  }

  // 방에 NOTICE 메시지를 보내기 위한 메서드
  @UseGuards(checkValidUser)
  @UseGuards(checkHostUser)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NOTICE)
  handleNoticeMessage(client: Socket, payload: IncomingMessageDto) {
    const room = client.rooms.values().next().value;
    if(!room) throw new WsException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    const user: User = client.data;
    const outgoingMessage: OutgoingMessageDto = {
      userId: payload.userId,
      nickname: user.nickname,
      color: user.color,
      msg: payload.msg,
      msgTime: new Date().toISOString(),
      msgType: 'notice',
    };

    console.log(payload, outgoingMessage);
    this.server.to(room).emit(CHATTING_SOCKET_RECEIVE_EVENT.NOTICE, outgoingMessage);
  }
}
