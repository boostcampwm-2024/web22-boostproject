import { HttpStatus } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

class ChatException extends WsException {
  statusCode: number;
  constructor({ statusCode, message } : ChatError , public roomId?: string) {
    super({ statusCode, message, roomId });
    this.statusCode = statusCode;
  }

  getError() {
    return {
      statusCode: this.statusCode,
      msg: this.message,
      roomId: this.roomId || null,
    };
  }
}

interface ChatError {
  statusCode: number;
  message: string;
}

const CHATTING_SOCKET_ERROR = {
  ROOM_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: '유저가 참여하고 있는 채팅방이 없습니다.'
  },

  ROOM_EXISTED: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: '이미 존재하는 방입니다.'
  },

  INVALID_USER: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: '유효하지 않는 유저입니다.'
  },

  UNAUTHORIZED: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: '해당 명령에 대한 권한이 없습니다.'
  },

  QUESTION_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: '유효하지 않은 질문입니다.'
  },

  BAN_USER: {
    statusCode: HttpStatus.FORBIDDEN,
    message: '호스트에 의해 밴 당한 유저입니다.'
  },

  MSG_TOO_LONG:{
    statusCode: HttpStatus.NOT_ACCEPTABLE,
    message: '메세지의 내용이 없거나, 길이가 150자를 초과했습니다.'
  }


};
export { CHATTING_SOCKET_ERROR, ChatException };

