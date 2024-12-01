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
}

export type RecentReplayResponse = {
  info: ReplayStream[];
  appendInfo: ReplayStream[];
};

export type ReplayExistenceResponse = {
  exited: boolean;
};
