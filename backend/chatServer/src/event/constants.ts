import { HttpStatus } from '@nestjs/common';

const CHATTING_SOCKET_DEFAULT_EVENT = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
};

const CHATTING_SOCKET_RECEIVE_EVENT = {
  NORMAL: 'receive_normal_chat',
  QUESTION: 'receive_question',
  QUESTION_DONE: 'receive_question_done',
  NOTICE: 'receive_notice',
  INIT: 'receive_init_data'
};

const CHATTING_SOCKET_SEND_EVENT = {
  NORMAL: 'send_normal_chat',
  QUESTION: 'send_question',
  QUESTION_DONE: 'send_question_done',
  NOTICE: 'send_notice'
};

const CHATTING_SOCKET_ERROR = {
  ROOM_EMPTY : {
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

  QUESTION_EMPTY: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: '유효하지 않은 질문입니다.'
  },


};

export { CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_SEND_EVENT, CHATTING_SOCKET_RECEIVE_EVENT, CHATTING_SOCKET_ERROR};
