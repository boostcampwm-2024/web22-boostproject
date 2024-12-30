import styled from 'styled-components';
import PlayPauseButton from './PlayPauseButton';
import VolumeControl from './VolumeControl';
import TimeDisplay from './TimeDisplay';
import FullscreenButton from './FullscreenButton';
import { useVideoContext } from '@contexts/VideoContext';

const ControlsOverlay: React.FC = () => {
  const { videoState, videoHandlers, controlsState } = useVideoContext();

  return (
    <OverlayContainer isVisible={controlsState.isControlsVisible}>
      <ControlsRow>
        <LeftGroup>
          <PlayPauseButton isPlaying={videoState.isPlaying} onClick={videoHandlers.handlePlayPause} />
          <VolumeControl
            isMuted={videoState.isMuted}
            volume={videoState.volume}
            onMuteToggle={videoHandlers.handleMuteToggle}
            onVolumeChange={videoHandlers.handleVolumeChange}
          />
          <TimeDisplay currentTime={videoState.currentTime} duration={videoState.duration} isLive={videoState.isLive} />
        </LeftGroup>
        <RightGroup>
          <FullscreenButton onClick={videoHandlers.toggleFullscreen} />
        </RightGroup>
      </ControlsRow>
    </OverlayContainer>
  );
};

export default ControlsOverlay;

// Styled Components
const OverlayContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 2;
  pointer-events: none;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
