import { ApiProperty } from '@nestjs/swagger';
import { ChannelDto } from './memoryDbDto.js';

export class ReplayVideoDto {
  @ApiProperty({
    description: '방송 고유 번호',
    example: 1,
  })
    videoNo: number = 0;

  @ApiProperty({
    description: '방송 ID(방송 세션키)',
    example: 'replay_session',
  })
    videoId: string = '';

  @ApiProperty({
    description: '방송 제목',
    example: '재미있는 코딩 강의',
  })
    videoTitle: string = '';

  @ApiProperty({
    description: '방송 시작 날짜',
    example: '2024-11-25T10:00:00.000Z',
  })
    startDate: Date = new Date();

  @ApiProperty({
    description: '방송 종료 날짜',
    example: '2024-11-25T11:00:00.000Z',
  })
    endDate: Date = new Date();

  @ApiProperty({
    description: '썸네일 이미지 URL',
    example: 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png',
  })
    thumbnailImageUrl: string = '';

  @ApiProperty({
    description: '트레일러 방송 URL',
    example: 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png',
    required: false,
  })
    trailerUrl?: string = '';

  @ApiProperty({
    description: '방송 재생 시간(초 단위)',
    example: 3600,
  })
    duration: number = 0;

  @ApiProperty({
    description: '조회수',
    example: 1000,
    required: false,
  })
    readCount?: number = 0;

  @ApiProperty({
    description: '방송 카테고리',
    example: 'education',
  })
    category: string = '';

  @ApiProperty({
    description: '라이브 조회수',
    example: 500,
  })
    livePr: number = 0;

  @ApiProperty({
    description: '채널 정보',
    type: ChannelDto,
  })
    channel: ChannelDto = new ChannelDto();

  @ApiProperty({
    description: '방송 태그',
    example: ['tag1', 'tag2', 'tag3'],
  })
    tags: Array<string> = [];

  @ApiProperty({
    description: '다시보기 m3u8 URL',
    example: 'https://kr.object.ncloudstorage.com/web22/live/replay_session/replay.m3u8',
  })
    replayUrl: string = '';

  constructor(data?: Partial<ReplayVideoDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
