import React, { createContext, useContext } from 'react';
import { VideoPlayerState } from '../reducers/videoPlayerReducer';
import { ControlsState } from '../reducers/controlsReducer';

interface VideoContextProps {
  videoState: VideoPlayerState;
  controlsState: ControlsState;
  videoHandlers: {
    handlePlayPause: () => void;
    handleMuteToggle: () => void;
    handleVolumeChange: (newVolume: number) => void;
    seek: (newTime: number) => void;
    toggleFullscreen: () => void;
    videoRef: React.RefObject<HTMLVideoElement>;
  };
}

const VideoContext = createContext<VideoContextProps | undefined>(undefined);

export const VideoProvider = VideoContext.Provider;

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};
