import styled from 'styled-components';
import ChevronDownIcon from '@assets/icons/chevron-down.svg';
import { MessageReceiveData } from '@type/chat';

interface ChatAutoScrollProps {
  currentChat?: MessageReceiveData | null;
  isAtBottom: boolean;
  scrollToBottom: () => void;
}

const ChatAutoScroll = ({ currentChat, isAtBottom, scrollToBottom }: ChatAutoScrollProps) => {
  return !isAtBottom ? (
    <ScrollToBottomButton $hasMsg={!!currentChat} onClick={scrollToBottom}>
      {currentChat && (
        <NormalChat $pointColor={currentChat.color}>
          <span className="text_point">{currentChat.nickname}</span>
          <span className="text_msg">{currentChat.msg}</span>
        </NormalChat>
      )}
      <StyledChevronDown />
    </ScrollToBottomButton>
  ) : null;
};

export default ChatAutoScroll;

const ScrollToBottomButton = styled.button<{ $hasMsg: boolean }>`
  position: absolute;
  bottom: 5px;
  right: 20px;
  height: 36px;
  width: ${({ $hasMsg }) => ($hasMsg ? '90%' : '36px')};
  display: flex;
  align-items: center;
  justify-content: ${({ $hasMsg }) => ($hasMsg ? 'space-between' : 'center')};
  padding: ${({ $hasMsg }) => ($hasMsg ? '0 4px 0 10px' : '0')};
  background-color: #1d1f22;
  color: ${({ theme }) => theme.tokenColors['text-default']};
  border-radius: ${({ $hasMsg }) => ($hasMsg ? '7px' : '100%')};
  cursor: pointer;
  font-size: 14px;
  z-index: 200;

  &:hover {
    background-color: ${({ theme }) => theme.tokenColors['primary-hover']};
  }
`;

const StyledChevronDown = styled(ChevronDownIcon)`
  width: 28px;
  height: 28px;
`;

const NormalChat = styled.div<{ $pointColor: string }>`
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 90%;

  .text_msg {
    flex: 1 1;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .text_point {
    color: ${({ $pointColor }) => $pointColor};
    margin-right: 5px;
  }
`;
