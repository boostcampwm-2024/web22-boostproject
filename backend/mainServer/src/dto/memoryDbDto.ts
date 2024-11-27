import { LiveVideoRequestDto } from './liveSessionDto.js';
import { DEFAULT_VALUE } from '../common/constants.js';
import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto {
  @ApiProperty({
    description: '(미사용)호스트 ID 문자열',
    example: 'channel123',
  })
    channelId: string = '';
  @ApiProperty({
    description: '호스트 이름',
    example: 'booduck',
  })
    channelName: string = '';
}

export class MemoryDbDto {
  id: number = 0;
  userId: string = '';
  streamKey: string = '';
  sessionKey: string = '';
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  streamUrl: string = '';
  replayUrl: string = '';
  defaultThumbnailImageUrl: string = DEFAULT_VALUE.THUMBNAIL_IMG_URL;
  concurrentUserCount: number = 0;
  channel: ChannelDto = {
    channelId : 'null',
    channelName : DEFAULT_VALUE.HOST_NAME,
  };
  notice : string = DEFAULT_VALUE.NOTICE;
  category: string = '';
  tags: Array<string> = [];
  state : boolean = false;
  replay: boolean = false;
  startDate : Date | null = null;
  endDate : Date | null = null;
  readCount: number = 0;
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