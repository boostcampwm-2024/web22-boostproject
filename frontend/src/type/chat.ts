export type ChattingReceiveTypes = 'normal' | 'question' | 'notice' | 'exception';
export type ChattingSendTypes = 'normal' | 'question' | 'notice';
export type WhoAmI = 'host' | 'me' | 'user';

// 기본 서버 응답 데이터
export interface MessageReceiveData {
  socketId: string;
  nickname: string;
  color: string;
  entryTime: string;
  msg: string | null;
  msgTime: Date;
  msgType: ChattingReceiveTypes;
  owner: WhoAmI;
  questionId?: number;
  questionDone?: boolean;
  statusCode?: number;
}

export interface MessageSendData {
  roomId: string;
  userId: string;
  questionId?: number;
  msg?: string;
  socketId?: string;
}

export interface ChatInitData {
  questionList: MessageReceiveData[];
}

export interface UserInfoData {
  nickname: string;
  socketId: string;
  entryTime: string;
  owner: WhoAmI;
}
