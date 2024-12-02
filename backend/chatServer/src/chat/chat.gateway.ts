import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {
  CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_RECEIVE_EVENT, CHATTING_SOCKET_SEND_EVENT
} from '../event/constants';
import {
  BanUserIncomingMessageDto,
  NormalIncomingMessageDto, NoticeIncomingMessageDto, QuestionDoneIncomingMessageDto, QuestionIncomingMessageDto
} from '../event/dto/IncomingMessage.dto';
import { JoiningRoomDto } from '../event/dto/JoiningRoom.dto';
import { RoomService } from '../room/room.service';
import { createAdapter } from '@socket.io/redis-adapter';
import { BlacklistGuard, HostGuard, MessageGuard } from './chat.guard';
import { LeavingRoomDto } from '../event/dto/LeavingRoom.dto';
import {
  NormalOutgoingMessageDto,
  NoticeOutgoingMessageDto,
  QuestionOutgoingMessageDto
} from '../event/dto/OutgoingMessage.dto';
import { QuestionDto } from '../event/dto/Question.dto';
import { ChatException, CHATTING_SOCKET_ERROR } from './chat.error';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private roomService: RoomService) {};

  async afterInit() {
    const { pubClient, subClient } = this.roomService.getPubSubClients();
    const redisAdapter = createAdapter(pubClient, subClient);
    this.server.adapter(redisAdapter);
    console.log('Redis adapter set');
  }

  @WebSocketServer()
    server!: Server;


  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const user = await this.roomService.createUser(client.id);
    console.log(user);

    /*
      2024-11-27 기준으로 socket.io 내부 로직의 문제로 default room 에서 나가게되면
      socket.broadcast 로직이 '자기 자신을 제외한' 유저에게 브로드캐스트 되는 것이 아니라
      '자기 자신을 포함한' 모든 유저에게 브로드캐스트 되도록 바뀜.
      https://github.com/socketio/socket.io/issues/4524
     */

    // client.leave(client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id, client.data);
    try {
      await this.roomService.deleteUser(client.id);
    } catch (error) {
      console.log(error);
    }
  }

  // 특정 방에 참여하기 위한 메서드
  @UseGuards(BlacklistGuard)
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM)
  async handleJoinRoom(client: Socket, payload: JoiningRoomDto) {
    const { roomId, userId } = payload;
    client.join(roomId);

    console.log(payload);
    // 만약 방이 없다면, 새로운 방을 만들고 호스트가 된다.
    await this.roomService.createRoom(roomId, userId);
    console.log(client.id, userId, roomId);
    const questionList = await this.roomService.getQuestionsNotDone(roomId);
    console.log('questionList', questionList);
    client.emit(CHATTING_SOCKET_RECEIVE_EVENT.INIT, { roomId, questionList: questionList.reverse() });
  }

  // 특정 방에서 나가기 위한 메서드
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.LEAVE_ROOM)
  handleLeaveRoom(client: Socket, payload: LeavingRoomDto) {
    const { roomId, userId } = payload;
    console.log('leave', roomId, userId);
    this.roomService.deleteUser(client.id);
    client.leave(roomId);
  }

  // 방에 NORMAL 메시지를 보내기 위한 메서드
  @UseGuards(MessageGuard, BlacklistGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NORMAL)
  async handleNormalMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: NormalIncomingMessageDto) {
    const { roomId, userId, msg } = payload;
    const user = await this.roomService.getUserByClientId(client.id);
    const normalOutgoingMessage: Omit<NormalOutgoingMessageDto, 'owner'> = {
      roomId,
      ...user,
      msg,
      msgTime: new Date().toISOString(),
      msgType: 'normal',
      socketId: client.id
    };
    console.log('Normal Message Come In: ', normalOutgoingMessage);
    const hostId = await this.roomService.getHostOfRoom(roomId);
    if(hostId === userId) {
      this.server.emit(CHATTING_SOCKET_RECEIVE_EVENT.NORMAL,  { ...normalOutgoingMessage, owner: 'host' });
    } else {
      // 나를 제외한, 방에 있는 모든 사람에게는 owner : user 로 보내고
      console.log('people', this.server.sockets.adapter.rooms.get(roomId));
      client.emit(CHATTING_SOCKET_RECEIVE_EVENT.NORMAL, { ...normalOutgoingMessage, owner: 'me' });
      client.broadcast.to(roomId).emit(CHATTING_SOCKET_RECEIVE_EVENT.NORMAL, {
        ...normalOutgoingMessage,
        owner: 'user'
      });
    }
  }

  // 방에 QUESTION 메시지를 보내기 위한 메서드
  @UseGuards(MessageGuard,BlacklistGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION)
  async handleQuestionMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: QuestionIncomingMessageDto) {
    const { roomId, msg } = payload;
    const user = await this.roomService.getUserByClientId(client.id);
    const questionWithoutId: Omit<QuestionDto, 'questionId'> = {
      roomId,
      ...user,
      msg,
      msgTime: new Date().toISOString(),
      msgType: 'question',
      questionDone: false,
      socketId: client.id
    };

    const question: QuestionOutgoingMessageDto = await this.roomService.addQuestion(roomId, questionWithoutId);
    this.server.to(roomId).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION, question);
  }

  // 방에 QUESTION DONE 메시지를 보내기 위한 메서드
  @UseGuards(HostGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE)
  async handleQuestionDoneMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: QuestionDoneIncomingMessageDto) {
    const { roomId, questionId } = payload;
    const question: QuestionDto = await this.roomService.markQuestionAsDone(roomId, questionId);

    this.server.to(roomId).emit(CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE, question);
  }

  // 방에 NOTICE 메시지를 보내기 위한 메서드
  @UseGuards(MessageGuard, HostGuard)
  @SubscribeMessage(CHATTING_SOCKET_SEND_EVENT.NOTICE)
  async handleNoticeMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: NoticeIncomingMessageDto) {
    const { roomId, msg } = payload;
    const user = await this.roomService.getUserByClientId(client.id);
    const noticeOutgoingMessage: NoticeOutgoingMessageDto = {
      roomId,
      ...user,
      msg,
      msgTime: new Date().toISOString(),
      msgType: 'notice'
    };
    this.server.to(roomId).emit(CHATTING_SOCKET_RECEIVE_EVENT.NOTICE, noticeOutgoingMessage);
  }

  @UseGuards(HostGuard)
  @SubscribeMessage(CHATTING_SOCKET_DEFAULT_EVENT.BAN_USER)
  async handleBanUserMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: BanUserIncomingMessageDto) {
    const { roomId, socketId } = payload;
    const banUser = this.server.sockets.sockets.get(socketId);
    const address = banUser?.handshake.address.replaceAll('::ffff:', '');

    if(!address) throw new ChatException(CHATTING_SOCKET_ERROR.INVALID_USER, roomId);

    const forwarded = banUser?.handshake.headers.forwarded ?? address;
    console.log('ban:', roomId, address, forwarded);

    await this.roomService.addUserToBlacklist(roomId, address, forwarded);
    console.log(await this.roomService.getUserBlacklist(roomId, address));
  }
}
