import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useVideoContext } from '@contexts/VideoContext';
import BufferedProgress from './BufferedProgress';
import CurrentProgress from './CurrentProgress';
import ProgressHandle from './ProgressHandle';

const ProgressBar: React.FC = () => {
  const { videoState, videoHandlers, controlsState } = useVideoContext();
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * videoState.duration;
      videoHandlers.seek(newTime);
    },
    [videoState.duration, videoHandlers]
  );

  const isVisible = controlsState.isControlsVisible;

  return (
    <Container ref={progressBarRef} onClick={handleSeek} isVisible={isVisible}>
      {videoState.bufferedSegments &&
        Array.from({ length: videoState.bufferedSegments.length }).map((_, i) => (
          <BufferedProgress
            key={i}
            start={videoState.bufferedSegments?.start(i)}
            end={videoState.bufferedSegments?.end(i)}
            duration={videoState.duration}
          />
        ))}
      <CurrentProgress currentTime={videoState.currentTime} duration={videoState.duration} isLive={videoState.isLive} />
      <ProgressHandle currentTime={videoState.currentTime} duration={videoState.duration} />
    </Container>
  );
};

export default ProgressBar;

const Container = styled.div<{ isVisible: boolean }>`
  position: absolute;
  bottom: 60px;
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  z-index: 2;
`;
