import styled from 'styled-components';

interface StreamingStatusProps {
  onStreaming: boolean;
}

export default function StreamingStatus({ onStreaming }: StreamingStatusProps) {
  return (
    <StatusContainer>
      <StatusIcon $onStreaming={onStreaming} />
      {onStreaming ? '온라인' : '오프라인'}
    </StatusContainer>
  );
}

const StatusContainer = styled.strong`
  height: 40px;
  background: #222222;
  border-width: 1px 0;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const StatusIcon = styled.i<{ $onStreaming: boolean }>`
  width: 8px;
  height: 8px;
  background: ${({ $onStreaming }) => ($onStreaming ? 'red' : 'rgba(255, 255, 255, 0.5)')};
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: -25%;
    right: -25%;
    top: -2px;
    bottom: -2px;
    border: 2px solid #ffffff;
    border-radius: 6px;
  }
`;
