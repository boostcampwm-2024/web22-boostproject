import { MemoryDbDto } from '../dto/memoryDbDto';
import { ReplayVideoDto } from '../dto/replayVideoDto';

export function memoryDbDtoToReplayVideoDto(memoryDbDto: MemoryDbDto): ReplayVideoDto {
  return {
    videoNo: memoryDbDto.id,
    videoId: memoryDbDto.sessionKey,
    videoTitle: memoryDbDto.liveTitle,
    startDate: memoryDbDto.startDate || new Date(),
    endDate: memoryDbDto.endDate || new Date(),
    thumbnailImageUrl: memoryDbDto.defaultThumbnailImageUrl || memoryDbDto.liveImageUrl,
    trailerUrl: memoryDbDto.liveImageUrl || null,
    duration: memoryDbDto.endDate && memoryDbDto.startDate
      ? Math.floor((memoryDbDto.endDate.getTime() - memoryDbDto.startDate.getTime()) / 1000)
      : 0,
    readCount: memoryDbDto.readCount || 0,
    category: memoryDbDto.category || 'unknown',
    tags: memoryDbDto.tags || [],
    livePr: memoryDbDto.livePr || 0,
    channel: {
      channelId: memoryDbDto.channel.channelId,
      channelName: memoryDbDto.channel.channelName,
    },
  };
}
