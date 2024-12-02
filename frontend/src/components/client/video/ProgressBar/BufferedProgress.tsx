import styled from 'styled-components';

interface BufferedProgressProps {
  start: number | undefined;
  end: number | undefined;
  duration: number;
}

const BufferedProgress: React.FC<BufferedProgressProps> = ({ start, end, duration }) => {
  const safeStart = start ?? 0;
  const safeEnd = end ?? 0;

  const left = (safeStart / duration) * 100;
  const width = ((safeEnd - safeStart) / duration) * 100;

  return <BufferedBar style={{ left: `${left}%`, width: `${width}%` }} />;
};

export default BufferedProgress;

const BufferedBar = styled.div`
  position: absolute;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  transition: width 0.2s ease;
`;
