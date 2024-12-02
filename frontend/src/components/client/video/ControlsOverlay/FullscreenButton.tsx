import styled from 'styled-components';
import { Maximize } from 'lucide-react';

interface FullscreenButtonProps {
  onClick: () => void;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} aria-label="전체화면 전환">
      <Maximize size={24} />
    </Button>
  );
};

export default FullscreenButton;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }
`;
