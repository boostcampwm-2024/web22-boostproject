import { LiveVideoRequestDto } from './liveSessionDto.js';
import { DEFAULT_VALUE } from '../common/constants.js';
import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto {
  @ApiProperty({
    description: '(미사용) 호스트 ID 문자열',
    example: 'channel_id',
  })
    channelId: string = '';

  @ApiProperty({
    description: '호스트 이름',
    example: 'booduck',
  })
    channelName: string = '';
}

export class MemoryDbDto {
  @ApiProperty({
    description: '데이터 고유 ID',
    example: 1,
  })
    id: number = 0;

  @ApiProperty({
    description: '사용자 ID',
    example: 'userId',
  })
    userId: string = '';

  @ApiProperty({
    description: '스트림 키',
    example: 'streamKey',
  })
    streamKey: string = '';

  @ApiProperty({
    description: '세션 키',
    example: 'sessionKey',
  })
    sessionKey: string = '';

  @ApiProperty({
    description: '라이브 ID === sessionKey',
    example: 'sessionKey',
  })
    liveId: string = '';

  @ApiProperty({
    description: '라이브 제목',
    example: 'live title',
  })
    liveTitle: string = '';

  @ApiProperty({
    description: '라이브 썸네일 이미지 URL',
    example: 'https://kr.object.ncloudstorage.com/web22/static/replay_test7_thumbnail.png',
  })
    liveImageUrl: string = '';

  @ApiProperty({
    description: '스트림 URL',
    example: 'https://streaming.example.com/live/streamKey',
  })
    streamUrl: string = '';

  @ApiProperty({
    description: '재생 URL',
    example: 'https://replay.example.com/live/replay',
  })
    replayUrl: string = '';

  @ApiProperty({
    description: '기본 썸네일 이미지 URL',
    example: DEFAULT_VALUE.THUMBNAIL_IMG_URL,
  })
    defaultThumbnailImageUrl: string = DEFAULT_VALUE.THUMBNAIL_IMG_URL;

  @ApiProperty({
    description: '동시 시청자 수',
    example: 0,
  })
    concurrentUserCount: number = 0;

  @ApiProperty({
    description: '채널 정보',
    type: ChannelDto,
    example: {
      channelId: 'null',
      channelName: 'Replay Host',
    },
  })
    channel: ChannelDto = {
      channelId: 'null',
      channelName: DEFAULT_VALUE.HOST_NAME,
    };

  @ApiProperty({
    description: '공지 사항',
    example: 'This is a test notice',
  })
    notice: string = DEFAULT_VALUE.NOTICE;

  @ApiProperty({
    description: '카테고리',
    example: 'category',
  })
    category: string = '';

  @ApiProperty({
    description: '태그 목록',
    example: ['tag1', 'tag2', 'tag3'],
  })
    tags: Array<string> = [];

  @ApiProperty({
    description: '라이브 상태 (true: 진행 중, false: 종료)',
    example: false,
  })
    state: boolean = false;

  @ApiProperty({
    description: '재생 가능 여부 (true: 재생 가능, false: 재생 불가)',
    example: false,
  })
    replay: boolean = false;

  @ApiProperty({
    description: '라이브 시작 시간',
    type: Date,
    example: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  })
    startDate: Date | null = null;

  @ApiProperty({
    description: '라이브 종료 시간',
    type: Date,
    example: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  })
    endDate: Date | null = null;

  @ApiProperty({
    description: '조회 수',
    example: 0,
  })
    readCount: number = 0;

  @ApiProperty({
    description: '라이브 우선 순위',
    example: 0,
  })
    livePr: number = 0;

  constructor(data?: Partial<MemoryDbDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}


export function memoryDbDtoFromLiveVideoRequestDto(
  memoryDbDto: MemoryDbDto,
  liveVideoDto: LiveVideoRequestDto
): MemoryDbDto {
  memoryDbDto.userId = liveVideoDto.userId;
  memoryDbDto.liveTitle = liveVideoDto.liveTitle;
  memoryDbDto.defaultThumbnailImageUrl = liveVideoDto.defaultThumbnailImageUrl;
  memoryDbDto.category = liveVideoDto.category;
  memoryDbDto.tags = [...liveVideoDto.tags];
  memoryDbDto.notice = liveVideoDto.notice;
  memoryDbDto.channel.channelName = liveVideoDto.hostName;
  return memoryDbDto;
}