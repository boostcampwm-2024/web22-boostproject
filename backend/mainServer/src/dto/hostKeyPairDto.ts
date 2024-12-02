import { ApiProperty } from '@nestjs/swagger';

export class hostKeyPairDto {
  @ApiProperty({example: 'this_is_userId', description: '클라이언트마다 가지는 랜덤한 userId 값'})
    userId: string = '';
}