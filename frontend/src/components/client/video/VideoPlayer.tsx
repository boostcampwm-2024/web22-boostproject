import React, { useRef } from 'react';
import styled from 'styled-components';
import Video from './Video';
import ControlsOverlay from './ControlsOverlay/ControlsOverlay';
import InformationOverlay from './InformationOverlay/InformationOverlay';
import ProgressBar from './ProgressBar/ProgressBar';
import { VideoProvider } from '@contexts/VideoContext';
import useVideoPlayer from '@hooks/useVideoPlayer/index';

interface VideoPlayerProps {
  url: string;
  isLive?: boolean;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDuration?: (duration: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  isLive = false,
  autoPlay = false,
  onTimeUpdate,
  onDuration
}) => {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const { videoState, controlsState, videoHandlers } = useVideoPlayer({
    url,
    isLive,
    autoPlay,
    onTimeUpdate,
    onDuration,
    playerContainerRef
  });

  const handlePlayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest('.controls-overlay') ||
      (e.target as HTMLElement).closest('.information-overlay')
    ) {
      return;
    }
    videoHandlers.handlePlayPause();
  };

  const contextValue = {
    videoState,
    controlsState,
    videoHandlers
  };

  return (
    <VideoProvider value={contextValue}>
      <PlayerContainer
        ref={playerContainerRef}
        isControlsVisible={controlsState.isControlsVisible}
        onClick={handlePlayerClick}
        tabIndex={0}
      >
        <Video ref={videoHandlers.videoRef} autoPlay={autoPlay} />
        <InformationOverlay />
        <ProgressBar />
        <ControlsOverlay />
      </PlayerContainer>
    </VideoProvider>
  );
};

export default VideoPlayer;

const PlayerContainer = styled.div<{ isControlsVisible: boolean }>`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  overflow: hidden;
  cursor: pointer;
  outline: none;

  &:hover .controls-overlay {
    opacity: 1;
  }
`;
