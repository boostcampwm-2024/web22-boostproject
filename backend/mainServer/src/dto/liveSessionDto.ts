import { ApiProperty } from '@nestjs/swagger';
import { MemoryDB } from '../memory-db/memory-db.decorator.js';
import { ChannelDto, MemoryDbDto } from './memoryDbDto.js';

@MemoryDB
export class LiveVideoRequestDto {
  @ApiProperty({example: 'this_is_userId', description: '클라이언트마다 가지는 랜덤한 userId 값'})
    userId: string = '';

  @ApiProperty({example: 'live title', description: '방송 제목'})
    liveTitle: string = '';

  @ApiProperty({example: '', description: '방송 썸네일 이미지(base64, 비어있을 경우 기본 값으로 설정)'})
    defaultThumbnailImageUrl: string = '';

  @ApiProperty({example: 'category', description: '방송 카테고리'})
    category: string = '';

  @ApiProperty({example: '', description: '방송 공지 (비어있을 경우 기본 값으로 설정)'})
    notice: string = '';

  @ApiProperty({example: 'host name', description: '호스트 이름'})
    hostName: string = '';

  @ApiProperty({example: ['tag1', 'tag2', 'tag3'], description: '방송 태그'})
    tags: Array<string> = [];
}

@MemoryDB
export class LiveSessionResponseDto {
  id: number = 0;
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  defaultThumbnailImageUrl: string = '';
  streamUrl: string = '';
  concurrentUserCount: number = 0;
  channel : ChannelDto = {
    channelId: '',
    channelName: '',
  };
  category: string = '';
  tags: Array<string> = [];
  startDate : Date | null = null;
  endDate : Date | null = null;
}


export function fromLiveSessionDto(memoryDbDto: MemoryDbDto): LiveSessionResponseDto {
  const {
    id,
    sessionKey,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl,
    concurrentUserCount,
    channel,
    category,
    tags,
    startDate,
    endDate,
    streamUrl,
  } = memoryDbDto;

  return {
    id,
    liveId : sessionKey,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl,
    concurrentUserCount,
    channel,
    category,
    tags,
    startDate,
    endDate,
    streamUrl
  };
}
