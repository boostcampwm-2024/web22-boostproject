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
    description: '방송 게시 날짜',
    example: '2024-11-25T10:00:00.000Z',
  })
    publishDate: Date;

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
    description: '게시 날짜의 타임스탬프',
    example: 1732400400000,
    required: false,
  })
    publishDateAt?: number;

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

  constructor(init?: Partial<ReplayVideoDto>) {
    this.videoNo = init?.videoNo ?? 0;
    this.videoId = init?.videoId ?? '';
    this.videoTitle = init?.videoTitle ?? '';
    this.publishDate = init?.publishDate ?? new Date(0);
    this.thumbnailImageUrl = init?.thumbnailImageUrl ?? '';
    this.trailerUrl = init?.trailerUrl;
    this.duration = init?.duration ?? 0;
    this.readCount = init?.readCount;
    this.publishDateAt = init?.publishDateAt;
    this.category = init?.category ?? '';
    this.livePr = init?.livePr ?? 0;
    this.channel = init?.channel ?? new ChannelDto();
  }
}
