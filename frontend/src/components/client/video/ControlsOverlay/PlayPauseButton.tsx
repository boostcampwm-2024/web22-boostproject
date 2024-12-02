import styled from 'styled-components';
import { Play, Pause } from 'lucide-react';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, onClick }) => {
  return (
    <Button onClick={onClick} aria-label={isPlaying ? '일시정지' : '재생'}>
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </Button>
  );
};

export default PlayPauseButton;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
