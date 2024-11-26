import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatQuestionSection from './ChatQuestionSection';
import { MessageReceiveData } from '@type/chat';
import { UserType } from '@type/user';

interface ChatRoomLayoutProps {
  worker: SharedWorker['port'] | null;
  messages: MessageReceiveData[];
  questions: MessageReceiveData[];
  userId: string;
  userType: UserType;
  roomId: string;
  isChatRoomVisible: boolean;
  setIsChatRoomVisible: (visible: boolean) => void;
}

export const ChatRoomLayout = ({
  worker,
  messages,
  questions,
  userId,
  userType,
  roomId,
  isChatRoomVisible,
  setIsChatRoomVisible
}: ChatRoomLayoutProps) => (
  <>
    <ChatOpenBtn $isVisible={!isChatRoomVisible} onClick={() => setIsChatRoomVisible(true)}>
      채팅 보기
    </ChatOpenBtn>

    <ChatRoomContainer $isVisible={isChatRoomVisible}>
      <ChatHeader outBtnHandler={() => setIsChatRoomVisible(false)} />

      <ChatQuestionSection questions={questions} worker={worker} userType={userType} roomId={roomId} />

      <ChatListContainer>
        <ChatList messages={messages} userId={userId} />
      </ChatListContainer>

      <ChatInputContainer>
        <ChatInput worker={worker} userType={userType} roomId={roomId} />
      </ChatInputContainer>
    </ChatRoomContainer>
  </>
);

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
  border-left: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  background: ${({ theme }) => theme.tokenColors['surface-default']};
`;

const ChatListContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: end;
  overflow-y: auto;
`;

const ChatInputContainer = styled.div`
  padding: 10px 20px;
`;
