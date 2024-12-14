import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Cluster, Redis } from 'ioredis';
import { createAdapter } from '@socket.io/redis-adapter';
import { RoomRepository } from './room.repository';
import { QuestionDto } from '../event/dto/Question.dto';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ChatException, CHATTING_SOCKET_ERROR } from '../chat/chat.error';
import { Socket } from 'socket.io';
import { UserFactory } from '../user/user.factory';

// 현재 파일의 URL을 파일 경로로 변환
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 상위 디렉터리의 .env 파일을 불러오기
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const REDIS_CONFIG = JSON.parse(process.env.REDIS_CONFIG!);

@Injectable()
export class RoomService implements OnModuleInit, OnModuleDestroy {
  redisAdapter: ReturnType<typeof createAdapter>;
  redisClient: Cluster;

  constructor(private redisRepository: RoomRepository, private userFactory: UserFactory) {
    this.redisClient = new Redis.Cluster(REDIS_CONFIG);
    this.redisAdapter = createAdapter(this.redisClient, this.redisClient);
  }

  async onModuleInit(){
    const redisClient = new Redis.Cluster(REDIS_CONFIG);
    this.redisRepository.injectClient(redisClient);
  }

  async onModuleDestroy(){
    if (this.redisClient) {
      await this.redisClient.quit();
      console.log('Redis connection closed');
    }
  }

  getClient(): Cluster {
    return this.redisClient;
  }

  getPubSubClients(): { pubClient: Cluster; subClient: Cluster } {
    const pubClient = this.redisClient.duplicate();
    const subClient = this.redisClient.duplicate();

    return { pubClient, subClient };
  }

  get adapter(): ReturnType<typeof createAdapter> {
    return this.redisAdapter;
  }


  // 방 생성
  async createRoom(roomId: string, hostId: string) {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (roomExists) return false;

    // roomId: hostId 로, room 에 hostId 지정
    await this.redisRepository.createNewRoom(roomId, hostId);
    console.log(`${hostId} 가 room: ${roomId} 을 만들었습니다.`);
    return true;
  }

  // 방 삭제
  async deleteRoom(roomId: string) {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);
    await this.redisRepository.deleteRoom(roomId);
  }

  async addQuestion(roomId: string, question: Omit<QuestionDto, 'questionId'>){
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return await this.redisRepository.addQuestionToRoom(roomId, question);
  }

  // 질문 추가
  async addQuestionAndReturnQuestion(
    roomId: string,
    question: Omit<QuestionDto, 'questionId'>,
  ): Promise<QuestionDto> {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return await this.redisRepository.addQuestionToRoom(roomId, question);
  }

  // 특정 질문 완료 처리
  async markQuestionAsDone(roomId: string, questionId: number) {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    const markedQuestion = await this.redisRepository.markQuestionAsDone(roomId, questionId);
    if (!markedQuestion) throw new ChatException(CHATTING_SOCKET_ERROR.QUESTION_EMPTY, roomId);
    return markedQuestion;
  }

  // 방에 속한 모든 질문 조회
  async getQuestions(roomId: string): Promise<QuestionDto[]> {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return this.redisRepository.getQuestionsAll(roomId);
  }

  async getQuestionsNotDone(roomId: string): Promise<QuestionDto[]> {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);

    return this.redisRepository.getQuestionsUnmarked(roomId);
  }

  // 특정 질문 조회
  async getQuestion(roomId: string, questionId: number): Promise<QuestionDto> {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);
    return this.redisRepository.getQuestion(roomId, questionId);
  }

  // 유저 생성
  async addUser(socket: Socket) {
    const clientId = socket.id;
    const address = socket.handshake.address.replaceAll('::ffff:', '');
    const userAgent = socket.handshake.headers['user-agent'];

    if(!address || !userAgent) throw new ChatException(CHATTING_SOCKET_ERROR.INVALID_USER);

    const newUser = this.userFactory.createUserInstance(address, userAgent);
    const isCreatedDone = await this.redisRepository.createUser(clientId, newUser);
    if(!isCreatedDone) throw new ChatException(CHATTING_SOCKET_ERROR.INVALID_USER);
    console.log(newUser);
    return newUser;
  }

  // 유저 삭제
  async deleteUser(clientId: string) {
    return await this.redisRepository.deleteUser(clientId);
  }

  // 특정 유저 조회
  async getUserByClientId(clientId: string) {
    const user = this.redisRepository.getUser(clientId);
    return user;
  }

  async getHostOfRoom(roomId: string) {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY, roomId);
    return await this.redisRepository.getHost(roomId);
  }

  async getUserBlacklist(roomId: string, address: string) {
    const roomExists = await this.redisRepository.isRoomExisted(roomId);
    if (!roomExists) return [];

    return await this.redisRepository.getUserBlacklist(roomId, address);
  }

  async addUserToBlacklist(roomId: string, address: string, userAgent: string){
    return await this.redisRepository.addUserBlacklistToRoom(roomId, address, userAgent);
  }
}
