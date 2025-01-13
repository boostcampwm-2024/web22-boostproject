import { ChannelInfo } from './channel';

export interface ReplayStream {
  videoNo: number;
  videoId: string;
  videoTitle: string;
  startDate: string;
  endDate: string;
  thumbnailImageUrl: string;
  trailerUrl: string;
  duration: number;
  readCount: number;
  category: string;
  tags: string[];
  livePr: number;
  channel: ChannelInfo;
  replayUrl: string;
}

export type RecentReplayResponse = {
  info: ReplayStream[];
  appendInfo: ReplayStream[];
};

export type ClientReplayResponse = {
  info: ReplayStream;
};

export type ReplayExistenceResponse = {
  existed: boolean;
};
