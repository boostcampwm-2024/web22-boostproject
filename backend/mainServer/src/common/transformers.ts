import { MemoryDbDto } from '../dto/memoryDbDto.js';
import { ReplayVideoDto } from '../dto/replayVideoDto.js';

export function memoryDbDtoToReplayVideoDto(memoryDbDto: MemoryDbDto): ReplayVideoDto {
  return {
    videoNo: memoryDbDto.id,
    videoId: memoryDbDto.sessionKey,
    videoTitle: memoryDbDto.liveTitle,
    startDate: memoryDbDto.startDate || new Date(),
    endDate: memoryDbDto.endDate || new Date(),
    thumbnailImageUrl: memoryDbDto.defaultThumbnailImageUrl || memoryDbDto.liveImageUrl,
    trailerUrl: memoryDbDto.liveImageUrl || '',
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
    replayUrl: memoryDbDto.replayUrl || '',
  };
}

export function replayVideoDtoToMemoryDbDto(replayVideoDto: ReplayVideoDto): MemoryDbDto {
  return new MemoryDbDto({
    id: replayVideoDto.videoNo,
    sessionKey: replayVideoDto.videoId,
    liveTitle: replayVideoDto.videoTitle,
    startDate: replayVideoDto.startDate || null,
    endDate: replayVideoDto.endDate || null,
    defaultThumbnailImageUrl: replayVideoDto.thumbnailImageUrl || '',
    liveImageUrl: replayVideoDto.trailerUrl || '',
    readCount: replayVideoDto.readCount || 0,
    category: replayVideoDto.category || 'unknown',
    tags: replayVideoDto.tags || [],
    livePr: replayVideoDto.livePr || 0,
    channel: {
      channelId: replayVideoDto.channel.channelId,
      channelName: replayVideoDto.channel.channelName,
    },
    replayUrl: replayVideoDto.replayUrl || '',
  });
}
