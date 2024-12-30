import { VideoPlayerAction, VideoPlayerState } from '@reducers/videoPlayerReducer';

export interface VideoPlayerProps {
  url: string;
  isLive?: boolean;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDuration?: (duration: number) => void;
}

export interface VideoPlayerHandlers {
  handlePlayPause: () => void;
  handleMuteToggle: () => void;
  handleVolumeChange: (newVolume: number) => void;
  handleTimeUpdate: () => void;
  seek: (newTime: number) => void;
  goToLiveEdge: () => void;
  toggleFullscreen: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export interface UseVideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  state: VideoPlayerState;
  dispatch: React.Dispatch<VideoPlayerAction>;
  playerContainerRef: React.RefObject<HTMLDivElement>;
  onTimeUpdate?: (time: number) => void;
}
