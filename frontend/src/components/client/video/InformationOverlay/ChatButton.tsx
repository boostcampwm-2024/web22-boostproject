import React from 'react';
import styled from 'styled-components';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} aria-label="채팅">
      <MessageCircle size={24} />
      <Label>채팅</Label>
    </Button>
  );
};

export default ChatButton;

const Button = styled.button`
  background: rgba(25, 25, 28, 0.5);
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const Label = styled.span`
  margin-left: 0.5rem;
  font-size: 14px;
  color: white;
`;
