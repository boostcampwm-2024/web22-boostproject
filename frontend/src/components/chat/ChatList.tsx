import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { useContext, useEffect, useRef, useState } from 'react';
import { MessageReceiveData } from '@type/chat';
import { CHATTING_TYPES } from '@constants/chat';
import { ChatContext } from 'src/contexts/chatContext';
import NoticeCard from './NoticeCard';
import ChatAutoScroll from './ChatAutoScroll';
import HostIconGreen from '@assets/icons/host_icon_green.svg';

export interface ChatListProps {
  messages: MessageReceiveData[];
}

const ChatList = ({ messages }: ChatListProps) => {
  const { state } = useContext(ChatContext);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [currentChat, setCurrentChat] = useState<MessageReceiveData | null>(null);

  const chatListRef = useRef<HTMLDivElement | null>(null);

  const checkIfAtBottom = () => {
    if (!chatListRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatListRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 1;
    setIsAtBottom(atBottom);
    if (atBottom && currentChat) {
      setCurrentChat(null);
    }
  };

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      setCurrentChat(null);
    }
  };

  useEffect(() => {
    if (chatListRef.current && isAtBottom) {
      scrollToBottom();
    } else {
      setCurrentChat(messages[messages.length - 1]);
    }
  }, [messages]);

  return (
    <ChatListSection>
      <ChatListWrapper ref={chatListRef} onScroll={checkIfAtBottom}>
        {messages.map((chat, index) => (
          <ChatItemWrapper key={index}>
            {chat.msgType === CHATTING_TYPES.QUESTION ? (
              <QuestionCard type="client" question={chat} />
            ) : chat.msgType === CHATTING_TYPES.NOTICE ? (
              <NoticeChat>
                <span>📢</span>
                <span>{chat.msg}</span>
              </NoticeChat>
            ) : (
              <NormalChat $isHost={chat.owner === 'host'} $pointColor={chat.owner === 'host' ? '#0ADD91' : chat.color}>
                {chat.owner === 'me' ? (
                  <span className="text_point">🧀</span>
                ) : chat.owner === 'host' ? (
                  <StyledIcon as={HostIconGreen} />
                ) : null}
                <span className="text_point">{chat.nickname}</span>
                <span className="chat_message">{chat.msg}</span>
              </NormalChat>
            )}
          </ChatItemWrapper>
        ))}
      </ChatListWrapper>
      <ChatAutoScroll currentChat={currentChat} isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
      {state.isNoticePopupOpen && (
        <PopupWrapper>
          <NoticeCard />
        </PopupWrapper>
      )}
    </ChatListSection>
  );
};

export default ChatList;

const ChatListSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  height: 100%;
`;

const ChatListWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 20px 0 20px;
  overflow-y: auto;
  scrollbar-width: none;
  z-index: 100;
`;

const ChatItemWrapper = styled.div`
  margin-top: auto;
  padding: 6px 0;
`;

const NoticeChat = styled.div`
  display: flex;
  padding: 10px 15px;
  gap: 10px;
  ${({ theme }) => theme.tokenTypographys['display-medium12']};
  color: ${({ theme }) => theme.tokenColors['text-default']};
  background-color: #0e0f10;
  border-radius: 8px;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const NormalChat = styled.div<{ $isHost: boolean; $pointColor: string }>`
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ $isHost, theme }) => ($isHost ? theme.tokenColors['color-accent'] : theme.tokenColors['color-white'])};

  .text_point {
    ${({ theme }) => theme.tokenTypographys['display-bold14']};
    color: ${({ $pointColor }) => $pointColor};
    margin-right: 8px;
  }

  .chat_message {
    color: ${({ $isHost }) => $isHost && '#82e3c4'};
    line-height: 1.5;
  }

  overflow-wrap: break-word;
  word-break: break-word;
`;

const PopupWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  z-index: 1000;
`;

const StyledIcon = styled.svg`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0 5px -4px 0;
`;
