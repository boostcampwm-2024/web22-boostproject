import { useState, useEffect } from 'react';
import styled from 'styled-components';

import PauseIcon from '@assets/icons/pause_icon.svg';
import PlayIcon from '@assets/icons/play_icon.svg';
import usePlayer from '@hooks/usePlayer';

const Player = ({ videoUrl }: { videoUrl: string }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const videoRef = usePlayer(videoUrl);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsPaused(!videoElement.paused);
    setShowIcon(true);
    setTimeout(() => setShowIcon(false), 1000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      }
    };

    const videoElement = videoRef.current;
    videoElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      videoElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <PlayerContainer>
      <LivePlayerInner>
        <Video
          ref={videoRef}
          controls
          onClick={handlePlayPause}
          tabIndex={0} // Video 요소가 포커스를 받을 수 있도록 설정
        />
        {showIcon && <IconOverlay>{isPaused ? <PlayIcon /> : <PauseIcon />}</IconOverlay>}
      </LivePlayerInner>
    </PlayerContainer>
  );
};

export default Player;

const PlayerContainer = styled.div`
  background: ${({ theme }) => theme.tokenColors['surface-default']};
  padding-top: 56.25%;
  position: relative;
`;

const LivePlayerInner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconOverlay = styled.div`
  position: absolute;
  width: 75px;
  height: 75px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.tokenColors['color-white']};
  border-radius: 50%;
  opacity: 0.8;
  transition: opacity 0.3s;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;
