import styled from 'styled-components';

interface ProgressHandleProps {
  currentTime: number;
  duration: number;
}

const ProgressHandle: React.FC<ProgressHandleProps> = ({ currentTime, duration }) => {
  const progress = duration === 0 ? 0 : (currentTime / duration) * 100;

  return <Handle style={{ left: `${progress}%` }} />;
};

export default ProgressHandle;

const Handle = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #ff0000;
  border: 2px solid #ff0000;
  border-radius: 50%;
  cursor: pointer;
  z-index: 4;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: rgba(255, 0, 0, 0.8);
    transform: translate(-50%, -50%) scale(1.2);
  }
`;
