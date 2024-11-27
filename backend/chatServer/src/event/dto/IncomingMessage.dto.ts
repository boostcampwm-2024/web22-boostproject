class DefaultIncomingMessageDto {
  roomId: string = '';
}

class NormalIncomingMessageDto extends DefaultIncomingMessageDto{
  userId: string = '';
  msg: string = '';
}

class QuestionIncomingMessageDto extends DefaultIncomingMessageDto {
  msg: string = '';
}

class QuestionDoneIncomingMessageDto extends DefaultIncomingMessageDto {
  userId: string = '';
  questionId: number = -1;
}

class NoticeIncomingMessageDto extends DefaultIncomingMessageDto {
  userId: string = '';
  msg: string = '';
}



export {
  NormalIncomingMessageDto,
  QuestionIncomingMessageDto,
  QuestionDoneIncomingMessageDto,
  DefaultIncomingMessageDto,
  NoticeIncomingMessageDto
};
