import { formatTime } from '@utils/time';
import styled from 'styled-components';

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
  isLive: boolean;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ currentTime, duration, isLive }) => {
  return <Container>{isLive ? 'LIVE' : `${formatTime(currentTime)} / ${formatTime(duration)}`}</Container>;
};

export default TimeDisplay;

const Container = styled.span`
  font-size: 16px;
  color: white;
`;
