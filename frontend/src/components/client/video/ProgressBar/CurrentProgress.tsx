import styled from 'styled-components';

interface CurrentProgressProps {
  currentTime: number;
  duration: number;
  isLive: boolean;
}

const CurrentProgress: React.FC<CurrentProgressProps> = ({ currentTime, duration, isLive }) => {
  const progress = duration === 0 ? 0 : (currentTime / duration) * 100;

  return <ProgressBarFill progress={progress} isLive={isLive} />;
};

export default CurrentProgress;

const ProgressBarFill = styled.div<{ progress: number; isLive: boolean }>`
  position: absolute;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0.7) 0%,
    rgba(255, 0, 0, 0.85) 50%,
    rgba(255, 0, 0, 1) 100%
  );
  transition: width 0.1s linear;
  width: ${(props) => props.progress}%;
  left: 0;
`;
