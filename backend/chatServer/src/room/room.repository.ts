import { Injectable } from '@nestjs/common';
import { Cluster } from 'ioredis';
import { QuestionDto } from '../event/dto/Question.dto';
import { ChatException, CHATTING_SOCKET_ERROR } from '../chat/chat.error';

type FORWARDED = string;

@Injectable()
export class RoomRepository {
  redisClient!: Cluster;
  roomIdPrefix = 'room:';
  questionPrefix = 'question';
  questionIdPrefix = 'id';
  blacklistPrefix = 'blacklist';

  injectClient(redisClient: Cluster){
    this.redisClient = redisClient;
  }

  private getRoomStringWithPrefix(roomId: string) {
    return `${this.roomIdPrefix}${roomId}`;
  }

  private getQuestionStringWithPrefix(roomId: string) {
    return `${this.getRoomStringWithPrefix(roomId)}-${this.questionPrefix}`;
  }

  private getQuestionIdWithPrefix(roomId: string) {
    return `${this.getRoomStringWithPrefix(roomId)}-${this.questionPrefix}-${this.questionIdPrefix}`;
  }

  private getUserBlacklistStringWithPrefix(address:string){
    return `${this.blacklistPrefix}:${address}`;
  }

  private getUserBlacklistInRoomWithPrefix(roomId:string, address:string){
    return `${this.getRoomStringWithPrefix(roomId)}-${this.getUserBlacklistStringWithPrefix(address)}`;
  }

  private async lindex<T>(key: string, index: number){
    const result = await this.redisClient.lindex(key, index);
    if(result) return JSON.parse(result) as T;
    return undefined;
  }

  private async lrange<T>(key: string, start: number, end: number){
    const result = await this.redisClient.lrange(key, start, end);
    return result as T;
  }

  private async getData<T>(key: string) {
    const result = await this.redisClient.get(key);
    if(result) return typeof result === 'string' ? result as T : JSON.parse(result) as T;
    return undefined;
  }

  async isRoomExisted(roomId: string) {
    return !! await this.redisClient.exists(this.getRoomStringWithPrefix(roomId));
  }

  async getHost(roomId: string) {
    const hostId = await this.redisClient.get(this.getRoomStringWithPrefix(roomId));
    if(!hostId) throw new ChatException(CHATTING_SOCKET_ERROR.ROOM_EMPTY);
    return hostId;
  }

  async createNewRoom(roomId: string, hostId: string) {
    await this.redisClient.set(this.getRoomStringWithPrefix(roomId), hostId);
    await this.redisClient.set(this.getQuestionIdWithPrefix(roomId), -1);
  }

  async deleteRoom(roomId: string) {
    await this.redisClient.del(this.getRoomStringWithPrefix(roomId));
  }

  async addQuestionToRoom(roomId: string, questionOmitId: Omit<QuestionDto, 'questionId'>): Promise<QuestionDto> {
    const questionId = await this.getQuestionId(roomId);
    const question: QuestionDto = { ...questionOmitId, questionId};
    await this.redisClient.rpush(this.getQuestionStringWithPrefix(roomId), JSON.stringify(question));
    return question;
  }

  async markQuestionAsDone(roomId: string, questionId: number): Promise<QuestionDto> {
    const question = await this.getQuestion(roomId, questionId);
    if(!question) throw new ChatException(CHATTING_SOCKET_ERROR.QUESTION_EMPTY);
    question.questionDone = true;
    this.redisClient.lset(this.getQuestionStringWithPrefix(roomId), questionId, JSON.stringify(question));
    return question;
  }

  async getQuestionsUnmarked(roomId: string){
    const questions = await this.lrange<QuestionDto[]>(this.getQuestionStringWithPrefix(roomId), 0, -1);
    console.log(questions);
    if(!questions) return [];
    return questions.filter((q) => !q.questionDone);
  }

  async getQuestion(roomId: string, questionId: number): Promise<QuestionDto> {
    const question = await this.lindex<Omit<QuestionDto, 'questionId'>>(this.getQuestionStringWithPrefix(roomId), questionId);
    if(question) return {...question, questionId };
    throw new ChatException(CHATTING_SOCKET_ERROR.QUESTION_EMPTY);
  }

  async getQuestionId(roomId: string) {
    return this.redisClient.incr(this.getQuestionIdWithPrefix(roomId));
  }

  async getQuestionsAll(roomId: string) {
    const questions = await this.getData<QuestionDto[]>(this.getQuestionStringWithPrefix(roomId));
    if(!questions) return [];
    return questions;
  }


  async getUserBlacklist(roomId: string, address: string): Promise<FORWARDED[]> {
    const userBlacklist = await this.lrange<FORWARDED[]>(this.getUserBlacklistInRoomWithPrefix(roomId, address), 0, -1);
    console.log('blacklist', userBlacklist);
    if (!userBlacklist) return [];
    return userBlacklist;
  }

  async addUserBlacklistToRoom(roomId: string, address: string, forwarded: string){
    console.log(roomId, address, forwarded);
    console.log(this.getUserBlacklistInRoomWithPrefix(roomId, address));
    return this.redisClient.rpush(this.getUserBlacklistInRoomWithPrefix(roomId, address), forwarded);
  }
}
