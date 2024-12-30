import { ChannelInfo } from './channel';
export interface MainLive {
  id: number;
  liveId: string;
  liveTitle: string;
  liveImageUrl: string;
  category: string;
  defaultThumbnailImageUrl: string;
  concurrentUserCount: number;
  channel: ChannelInfo;
  streamUrl: string;
}

export interface RecentLive extends MainLive {
  tags: string[];
  startDate: string;
  endDate: string;
}

export interface ClientLive extends MainLive {
  tags: string[];
  startDate: string;
  endDate: string;
}

export type RecentLiveResponse = {
  info: RecentLive[];
  appendInfo: RecentLive[];
};
