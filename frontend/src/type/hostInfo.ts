export interface HostInfo {
  userId: string;
  liveTitle: string;
  hostName: string;
  notice: string;
  defaultThumbnailImageUrl: string;
  category: string;
  tags: string[];
}

export interface FormValues {
  liveTitle: string;
  category: string;
  tag: string;
  tags: string[];
  notice: string;
  hostName: string;
  previewImage: string | null;
}
