import { ApiProperty } from '@nestjs/swagger';
import { ChannelDto } from './memoryDbDto.js';

export class ReplayVideoDto {
  @ApiProperty({
    description: '방송 고유 번호',
    example: 1,
  })
    videoNo: number;

  @ApiProperty({
    description: '방송 ID(방송 세션키)',
    example: 'replay_session',
  })
    videoId: string;

  @ApiProperty({
    description: '방송 제목',
    example: '재미있는 코딩 강의',
  })
    videoTitle: string;

  @ApiProperty({
    description: '방송 시작 날짜',
    example: '2024-11-25T10:00:00.000Z',
  })
    startDate: Date;

  @ApiProperty({
    description: '방송 종료 날짜',
    example: '2024-11-25T11:00:00.000Z',
  })
    endDate: Date;

  @ApiProperty({
    description: '썸네일 이미지 URL',
    example: 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png',
  })
    thumbnailImageUrl: string;

  @ApiProperty({
    description: '트레일러 방송 URL',
    example: 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png',
    required: false,
  })
    trailerUrl?: string | null;

  @ApiProperty({
    description: '방송 재생 시간(초 단위)',
    example: 3600,
  })
    duration: number;

  @ApiProperty({
    description: '조회수',
    example: 1000,
    required: false,
  })
    readCount?: number;

  @ApiProperty({
    description: '방송 카테고리',
    example: 'education',
  })
    category: string;

  @ApiProperty({
    description: '라이브 조회수',
    example: 500,
  })
    livePr: number;

  @ApiProperty({
    description: '채널 정보',
    type: ChannelDto,
  })
    channel: ChannelDto;

  @ApiProperty({
    description: '방송 태그',
    example: ['tag1', 'tag2', 'tag3'],
  })
    tags: Array<string>;
  constructor(init?: Partial<ReplayVideoDto>) {
    this.videoNo = init?.videoNo ?? 0;
    this.videoId = init?.videoId ?? '';
    this.videoTitle = init?.videoTitle ?? '';
    this.startDate = init?.startDate ?? new Date(0);
    this.endDate = init?.endDate ?? new Date(0);
    this.thumbnailImageUrl = init?.thumbnailImageUrl ?? '';
    this.trailerUrl = init?.trailerUrl;
    this.duration = init?.duration ?? 0;
    this.readCount = init?.readCount;
    this.category = init?.category ?? '';
    this.livePr = init?.livePr ?? 0;
    this.channel = init?.channel ?? new ChannelDto();
    this.tags = init?.tags ?? [];
  }
}
