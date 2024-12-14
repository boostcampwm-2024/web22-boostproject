import { User } from '../user/user.interface';

interface Room {
  hostId: string;
  users: Map<string, User>;
  // questions: Question[];
  // questions 는 flatten 하게 room 에 넣자 -> 자주 조회할 것이므로
}

export { Room };
