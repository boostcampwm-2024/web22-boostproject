import { formatTime } from '@utils/time';
import styled from 'styled-components';

interface PreviewThumbnailProps {
  time: number;
  pos: number;
}

const PreviewThumbnail: React.FC<PreviewThumbnailProps> = ({ time, pos }) => {
  return (
    <Container pos={pos}>
      <Time>{formatTime(time)}</Time>
    </Container>
  );
};

export default PreviewThumbnail;

const Container = styled.div<{ pos: number }>`
  position: absolute;
  bottom: 100%;
  left: ${(props) => props.pos}%;
  transform: translateX(-50%);
  background: #000;
  padding: 2px 4px;
  border-radius: 4px;
  margin-bottom: 8px;
  z-index: 3;
`;

const Time = styled.div`
  color: white;
  font-size: 12px;
  text-align: center;
`;