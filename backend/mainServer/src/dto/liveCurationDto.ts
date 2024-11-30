import { MemoryDB } from '../memory-db/memory-db.decorator.js';
import { MemoryDbDto, ChannelDto } from './memoryDbDto.js';

@MemoryDB
export class LiveCurationDto {
  id: number = 0;
  liveId: string = '';
  liveTitle: string = '';
  liveImageUrl: string = '';
  defaultThumbnailImageUrl: string = 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png';
  concurrentUserCount: number = 0;
  channel: ChannelDto = {
    channelId : '',
    channelName : ''
  };
  category: string = '';
  streamUrl: string = '';
}

export function fromLiveCurationDto(memoryDbDto: MemoryDbDto): LiveCurationDto {
  const {
    id,
    sessionKey,
    liveTitle,
    liveImageUrl,
    defaultThumbnailImageUrl = 'https://kr.object.ncloudstorage.com/web22/static/liboo_default_thumbnail.png',
    concurrentUserCount,
    channel,
    category,
    streamUrl
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
    streamUrl
  };
}
