export const CHATTING_TYPES = {
  NORMAL: 'normal',
  QUESTION: 'question',
  NOTICE: 'notice'
} as const;

export const CHATTING_SOCKET_DEFAULT_EVENT = {
  JOIN_ROOM: 'join_room'
} as const;

export const CHATTING_SOCKET_RECEIVE_EVENT = {
  INIT: 'receive_init_data',
  NORMAL: 'receive_normal_chat',
  QUESTION: 'receive_question',
  QUESTION_DONE: 'receive_question_done',
  NOTICE: 'receive_notice'
} as const;

export const CHATTING_SOCKET_SEND_EVENT = {
  NORMAL: 'send_normal_chat',
  QUESTION: 'send_question',
  QUESTION_DONE: 'send_question_done',
  NOTICE: 'send_notice'
} as const;
