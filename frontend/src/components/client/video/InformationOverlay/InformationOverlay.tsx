import styled from 'styled-components';
import LiveBadge from './LiveBadge';
import ChatButton from './ChatButton';
import { useVideoContext } from '@contexts/VideoContext';

const InformationOverlay: React.FC = () => {
  const { videoState, controlsState } = useVideoContext();

  return (
    <OverlayContainer isVisible={controlsState.isControlsVisible}>
      {videoState.isLive && <LiveBadge />}
      <ControlButtons>
        <ChatButton onClick={() => console.log('채팅 버튼 클릭')} />
      </ControlButtons>
    </OverlayContainer>
  );
};

export default InformationOverlay;

const OverlayContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  gap: 0.5rem;
  z-index: 3;
  pointer-events: auto;

  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
