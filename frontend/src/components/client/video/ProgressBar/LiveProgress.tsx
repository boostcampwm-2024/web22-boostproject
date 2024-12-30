import styled from 'styled-components';

interface LiveProgressProps {
  isLive: boolean;
}

const LiveProgress: React.FC<LiveProgressProps> = ({ isLive }) => {
  return <LiveIndicator isLive={isLive} />;
};

export default LiveProgress;

const LiveIndicator = styled.div<{ isLive: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => (props.isLive ? '4px' : '0')};
  height: 100%;
  background-color: #ff0000;
  box-shadow: ${(props) => (props.isLive ? '0 0 6px #ff0000' : 'none')};
  transition: width 0.2s ease;
`;
