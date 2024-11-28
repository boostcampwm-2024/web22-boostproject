import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatQuestionSection from './ChatQuestionSection';

import { UserType } from '@type/user';
import { memo, useCallback, useState } from 'react';
import { useChatRoom } from '@hooks/useChatRoom';
import { getStoredId } from '@utils/id';

interface ChatRoomLayoutProps {
  userType: UserType;
  roomId: string;
}

const ChatRoomLayout = ({ userType, roomId }: ChatRoomLayoutProps) => {
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(true);

  const userId = getStoredId();
  const { worker, messages, questions } = useChatRoom(roomId as string, userId);

  const handleCloseChatRoom = useCallback(() => {
    setIsChatRoomVisible(false);
  }, []);

  const handleOpenChatRoom = useCallback(() => {
    setIsChatRoomVisible(true);
  }, []);

  return (
    <>
      <ChatOpenBtn $isVisible={!isChatRoomVisible} onClick={handleOpenChatRoom}>
        채팅 보기
      </ChatOpenBtn>

      <ChatRoomContainer $isVisible={isChatRoomVisible}>
        <ChatHeader outBtnHandler={handleCloseChatRoom} />

        <ChatQuestionSection questions={questions} worker={worker} userType={userType} roomId={roomId} />

        <ChatList messages={messages} />

        <ChatInputContainer>
          <ChatInput worker={worker} userType={userType} roomId={roomId} />
        </ChatInputContainer>
      </ChatRoomContainer>
    </>
  );
};

export default memo(ChatRoomLayout);

const ChatOpenBtn = styled.button<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  height: 15px;
  background-color: #505050;
`;

const ChatRoomContainer = styled.aside<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  height: 100%;
  min-width: 380px;
  max-width: 380px;
  border-left: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  background: ${({ theme }) => theme.tokenColors['surface-default']};
`;

const ChatInputContainer = styled.div`
  padding: 10px 20px;
`;
