const CHATTING_SOCKET_DEFAULT_EVENT = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  BAN_USER: 'ban_user',
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

export { CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_SEND_EVENT, CHATTING_SOCKET_RECEIVE_EVENT};
