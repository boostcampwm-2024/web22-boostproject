import { OutgoingMessageType } from './OutgoingMessage.dto';

class QuestionDto {
  roomId: string = '';
  nickname: string = '';
  color: string = '';
  msg: string = '';
  msgTime: string = new Date().toISOString();
  msgType: OutgoingMessageType = 'question';
  questionId: number = -1;
  socketId: string = '';
  questionDone: boolean = false;
}

export { QuestionDto };
