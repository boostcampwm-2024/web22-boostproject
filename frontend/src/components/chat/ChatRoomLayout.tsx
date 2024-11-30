import { memo, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatQuestionSection from './ChatQuestionSection';
import ChatIcon from '@assets/icons/chat_icon.svg';
import { useChatRoom } from '@hooks/useChatRoom';
import { UserType } from '@type/user';
import { getStoredId } from '@utils/id';
import NoticeCard from './NoticeCard';
import { ChatContext } from '@contexts/chatContext';
import UserInfoCard from './UserInfoCard';

interface ChatRoomLayoutProps {
  userType: UserType;
  roomId: string;
}

const ChatRoomLayout = ({ userType, roomId }: ChatRoomLayoutProps) => {
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(true);

  const userId = getStoredId();
  const { worker, messages, questions } = useChatRoom(roomId as string, userId);

  const { state } = useContext(ChatContext);

  const handleCloseChatRoom = useCallback(() => {
    setIsChatRoomVisible(false);
  }, []);

  const handleOpenChatRoom = useCallback(() => {
    setIsChatRoomVisible(true);
  }, []);

  return (
    <>
      <ChatOpenBtn $isVisible={!isChatRoomVisible} onClick={handleOpenChatRoom}>
        <StyledChatIcon />
      </ChatOpenBtn>

      <ChatRoomContainer $isVisible={isChatRoomVisible}>
        <ChatHeader outBtnHandler={handleCloseChatRoom} />

        <ChatQuestionSection questions={questions} worker={worker} userType={userType} roomId={roomId} />

        <ChatList messages={messages} />

        {state.isNoticePopupOpen && (
          <PopupWrapper>
            <NoticeCard />
          </PopupWrapper>
        )}

        {state.isUserInfoPopupOpen && (
          <PopupWrapper>
            <UserInfoCard worker={worker} roomId={roomId} />
          </PopupWrapper>
        )}

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
  position: relative;
  height: 15px;
`;

const StyledChatIcon = styled(ChatIcon)`
  position: absolute;
  top: 0;
  right: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const ChatRoomContainer = styled.aside<{ $isVisible: boolean }>`
  position: relative;
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

const PopupWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  left: 5%;
  right: 5%;
  z-index: 1000;
`;
