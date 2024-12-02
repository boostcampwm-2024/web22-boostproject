import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { UserInfoData, MessageReceiveData } from '@type/chat';
import { CHATTING_TYPES } from '@constants/chat';
import ChatAutoScroll from './ChatAutoScroll';
import HostIconGreen from '@assets/icons/host_icon_green.svg';
import { useChat } from '@contexts/chatContext';

export interface ChatListProps {
  messages: MessageReceiveData[];
}

const ChatItemWrapper = memo(
  ({ chat, onNicknameClick }: { chat: MessageReceiveData; onNicknameClick: (data: UserInfoData) => void }) => {
    const { nickname, socketId, entryTime, owner } = chat;
    const handleNicknameClick = () => onNicknameClick({ nickname, socketId, entryTime, owner });
    if (chat.msgType === CHATTING_TYPES.QUESTION) {
      return (
        <ChatItem>
          <QuestionCard type="client" question={chat} />
        </ChatItem>
      );
    } else if (chat.msgType === CHATTING_TYPES.NOTICE) {
      return (
        <ChatItem>
          <NoticeChat>
            <span>📢</span>
            <span>{chat.msg}</span>
          </NoticeChat>
        </ChatItem>
      );
    } else if (chat.msgType === CHATTING_TYPES.EXCEPTION) {
      return (
        <ChatItem>
          <NoticeChat>
            <span>🚨</span>
            <span>{chat.msg}</span>
          </NoticeChat>
        </ChatItem>
      );
    } else {
      return (
        <ChatItem>
          <NormalChat $isHost={chat.owner === 'host'} $pointColor={chat.owner === 'host' ? '#0ADD91' : chat.color}>
            {chat.owner === 'me' ? (
              <span className="text_point">🧀</span>
            ) : chat.owner === 'host' ? (
              <StyledIcon as={HostIconGreen} />
            ) : null}
            <span className="text_point" onClick={handleNicknameClick}>
              {chat.nickname}
            </span>
            <span className="chat_message">{chat.msg}</span>
          </NormalChat>
        </ChatItem>
      );
    }
  }
);

ChatItemWrapper.displayName = 'ChatItemWrapper';

const ChatList = ({ messages }: ChatListProps) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [currentChat, setCurrentChat] = useState<MessageReceiveData | null>(null);

  const chatListRef = useRef<HTMLDivElement | null>(null);

  const { dispatch } = useChat();

  const onNicknameClick = useCallback(
    (data: UserInfoData) => {
      dispatch({
        type: 'SET_SELECTED_USER',
        payload: data
      });
    },
    [dispatch]
  );

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
          <ChatItemWrapper chat={chat} key={index} onNicknameClick={onNicknameClick} />
        ))}
      </ChatListWrapper>
      <ChatAutoScroll currentChat={currentChat} isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
    </ChatListSection>
  );
};

export default ChatList;

const ChatListSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  overflow-y: hidden;
`;

const ChatListWrapper = styled.div`
  box-sizing: border-box;
  max-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 50px 20px 0 20px;
  scrollbar-width: none;
`;

const ChatItem = styled.div`
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
    cursor: pointer;
  }

  .chat_message {
    color: ${({ $isHost }) => $isHost && '#82e3c4'};
    line-height: 1.5;
  }

  overflow-wrap: break-word;
  word-break: break-word;
`;

const StyledIcon = styled.svg`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0 5px -4.5px 0;
`;
