import styled from 'styled-components';
import SettingInfo from './SettingInfo';
import { usePortal } from '@hooks/usePortal';
import { useModal } from '@hooks/useModal';
import StreamingView from './StreamingView';
import StreamingStatus from './StreamingStatus';
import { ASSETS } from '@constants/assets';

interface StreamingDisplayProps {
  onStreaming: boolean;
}

interface ContainerProps {
  $onStreaming: boolean;
}

export default function StreamingDisplay({ onStreaming }: StreamingDisplayProps) {
  const { isOpen, closeModal, openModal } = useModal();
  const createPortal = usePortal();

  return (
    <>
      <Container $onStreaming={onStreaming}>
        <StreamingView onStreaming={onStreaming} openModal={openModal} />
      </Container>
      <StreamingStatus onStreaming={onStreaming} />
      {isOpen && createPortal(<SettingInfo closeModal={closeModal} />)}
    </>
  );
}

const Container = styled.div<ContainerProps>`
  background: ${({ $onStreaming }) =>
    $onStreaming ? '#000' : `url(${ASSETS.IMAGES.PLAYER.LOADING}) no-repeat center / cover`};
  width: 100%;
  padding-top: 56.25%;
  position: relative;
`;
