export type ChattingTypes = 'normal' | 'question' | 'notice';
export type WhoAmI = 'host' | 'me' | 'user';

// 기본 서버 응답 데이터
export interface MessageReceiveData {
  userId: string;
  nickname: string;
  color: string;
  msg: string | null;
  msgTime: Date;
  msgType: ChattingTypes;
  owner?: WhoAmI;
  questionId?: number;
  questionDone?: boolean;
}

export interface MessageSendData {
  roomId: string;
  userId: string;
  questionId?: number;
  msg?: string;
}

export interface ChatInitData {
  questionList: MessageReceiveData[];
}
