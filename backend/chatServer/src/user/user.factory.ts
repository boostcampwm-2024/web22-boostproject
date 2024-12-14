import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { getRandomAdjective, getRandomBrightColor, getRandomNoun } from '../utils/random';

@Injectable()
export class UserFactory {
  private createRandomNickname(): string {
    return `${getRandomAdjective()} ${getRandomNoun()}`;
  }

  createUserInstance(address: string, userAgent: string): User {
    return {
      address,
      userAgent,
      nickname: this.createRandomNickname(),
      color: getRandomBrightColor(),
      entryTime: new Date().toISOString(),
    };
  }
}
