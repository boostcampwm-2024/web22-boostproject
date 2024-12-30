import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cluster } from 'ioredis';
import { RoomRepository } from './room.repository';
import { QuestionDto } from '../event/dto/Question.dto';

import { ChatException, CHATTING_SOCKET_ERROR } from '../chat/chat.error';
import { Socket } from 'socket.io';
import { UserFactory } from '../user/user.factory';
import { RedisClientFactory } from '../redis/redis-client.factory';

@Injectable()
export class RoomService implements OnModuleInit {
  redisClient: Cluster | undefined;
  constructor(private readonly redisClientFactory: RedisClientFactory, private roomRepository: RoomRepository, private userFactory: UserFactory) {}

  async onModuleInit() {
    this.redisClient = this.redisClientFactory.createClient();
    this.roomRepository.injectClient(this.redisClient);
  }

  // 방 생성
  async createRoom(roomId: string, hostId: string) {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (roomExists) return false;

    // roomId: hostId 로, room 에 hostId 지정
    await this.roomRepository.createNewRoom(roomId, hostId);
    console.log(`${hostId} 가 room: ${roomId} 을 만들었습니다.`);
    return true;
  }

  // 방 삭제
  async deleteRoom(roomId: string) {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);
    await this.roomRepository.deleteRoom(roomId);
  }

  async addQuestion(roomId: string, question: Omit<QuestionDto, 'questionId'>){
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return await this.roomRepository.addQuestionToRoom(roomId, question);
  }

  // 질문 추가
  async addQuestionAndReturnQuestion(
    roomId: string,
    question: Omit<QuestionDto, 'questionId'>,
  ): Promise<QuestionDto> {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return await this.roomRepository.addQuestionToRoom(roomId, question);
  }

  // 특정 질문 완료 처리
  async markQuestionAsDone(roomId: string, questionId: number) {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    const markedQuestion = await this.roomRepository.markQuestionAsDone(roomId, questionId);
    if (!markedQuestion) throw new ChatException(CHATTING_SOCKET_ERROR.QUESTION_EMPTY, roomId);
    return markedQuestion;
  }

  // 방에 속한 모든 질문 조회
  async getQuestions(roomId: string): Promise<QuestionDto[]> {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return this.roomRepository.getQuestionsAll(roomId);
  }

  async getQuestionsNotDone(roomId: string): Promise<QuestionDto[]> {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return this.roomRepository.getQuestionsUnmarked(roomId);
  }

  // 특정 질문 조회
  async getQuestion(roomId: string, questionId: number): Promise<QuestionDto> {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);
    return this.roomRepository.getQuestion(roomId, questionId);
  }

  // 유저 생성
  async addUser(socket: Socket) {
    const clientId = socket.id;
    const address = socket.handshake.address.replaceAll('::ffff:', '');
    const userAgent = socket.handshake.headers['user-agent'];

    if(!address || !userAgent) throw new ChatException(CHATTING_SOCKET_ERROR.INVALID_USER);

    const newUser = this.userFactory.createUserInstance(address, userAgent);
    const isCreatedDone = await this.roomRepository.createUser(clientId, newUser);
    if(!isCreatedDone) throw new ChatException(CHATTING_SOCKET_ERROR.INVALID_USER);
    console.log(newUser);
    return newUser;
  }

  // 유저 삭제
  async deleteUser(clientId: string) {
    return await this.roomRepository.deleteUser(clientId);
  }

  // 특정 유저 조회
  async getUserByClientId(clientId: string) {
    const user = this.roomRepository.getUser(clientId);
    return user;
  }

  async getHostOfRoom(roomId: string) {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);
    return await this.roomRepository.getHost(roomId);
  }

  async getUserBlacklist(roomId: string, address: string) {
    const roomExists = await this.roomRepository.isRoomExisted(roomId);
    if (!roomExists) return [];

    return await this.roomRepository.getUserBlacklist(roomId, address);
  }

  async addUserToBlacklist(roomId: string, address: string, userAgent: string){
    return await this.roomRepository.addUserBlacklistToRoom(roomId, address, userAgent);
  }
}
