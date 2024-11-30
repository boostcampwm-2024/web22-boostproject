type OutgoingMessageType = 'normal' | 'question' | 'notice';
type WhoAmI = 'host' | 'me' | 'user';

class DefaultOutgoingMessageDto {
  roomId: string = '';
  nickname: string = '';
  color: string = '';
  msgTime: string = new Date().toISOString();
}

class NormalOutgoingMessageDto extends DefaultOutgoingMessageDto {
  msg: string = '';
  msgType: OutgoingMessageType = 'normal';
  owner: WhoAmI = 'user';
  socketId: string = '';
}

class QuestionOutgoingMessageDto extends DefaultOutgoingMessageDto {
  msg: string = '';
  questionId: number = -1;
  questionDone: boolean = false;
  msgType: OutgoingMessageType = 'question';
  socketId: string = '';
}

class QuestionDoneOutgoingMessageDto extends DefaultOutgoingMessageDto {
  msg: string = '';
  questionId: number = -1;
  questionDone: boolean = false;
  msgType: OutgoingMessageType = 'question';
}

class NoticeOutgoingMessageDto extends DefaultOutgoingMessageDto {
  msg: string = '';
  msgType: OutgoingMessageType = 'notice';
}
export {
  NormalOutgoingMessageDto,
  NoticeOutgoingMessageDto,
  QuestionDoneOutgoingMessageDto,
  QuestionOutgoingMessageDto,
  OutgoingMessageType
};

