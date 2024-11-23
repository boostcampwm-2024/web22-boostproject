import styled from 'styled-components';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatList from './ChatList';
import ChatQuestionSection from './ChatQuestionSection';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocket } from '@utils/createSocket';
import { CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_RECEIVE_EVENT } from '@constants/chat';
import { ChatInitData, MessageReceiveData } from '@type/chat';
import { ChatProvider } from 'src/contexts/chatContext';
import { getStoredId } from '@utils/id';
import { UserType } from '@type/user';

const TEST_SOCKET_URL = 'https://test.liboo.kr';

interface ChatRoomProps {
  userType: UserType;
}

export const ChatRoom = ({ userType }: ChatRoomProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageReceiveData[]>([]);
  const [questions, setQuestions] = useState<MessageReceiveData[]>([]);
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(true);

  const { id } = useParams();

  const userId = getStoredId();

  useEffect(() => {
    setMessages([]);

    const eventMap = {
      [CHATTING_SOCKET_RECEIVE_EVENT.INIT]: (initData: ChatInitData) => {
        setQuestions(initData.questionList);
      },
      [CHATTING_SOCKET_RECEIVE_EVENT.NORMAL]: (newMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      },
      [CHATTING_SOCKET_RECEIVE_EVENT.QUESTION]: (questionMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, questionMessage]);
        setQuestions((prevMessages) => [questionMessage, ...prevMessages]);
      },
      [CHATTING_SOCKET_RECEIVE_EVENT.NOTICE]: (noticeMessage: MessageReceiveData) => {
        setMessages((prevMessages) => [...prevMessages, noticeMessage]);
      },
      [CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE]: (questionMessage: MessageReceiveData) => {
        setQuestions((prevMessages) =>
          prevMessages.filter((message) => message.questionId !== questionMessage.questionId)
        );
      }
    };

    const newSocket = createSocket(TEST_SOCKET_URL, eventMap, (socket) => {
      socket.emit(CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM, { roomId: id, userId });
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [id, userId]);

  return (
    <ChatProvider>
      {/* 임시 버튼입니다 */}
      <ChatOpenBtn $isVisible={!isChatRoomVisible} onClick={() => setIsChatRoomVisible(true)}>
        채팅 보기
      </ChatOpenBtn>

      <ChatRoomContainer $isVisible={isChatRoomVisible}>
        <ChatHeader outBtnHandler={() => setIsChatRoomVisible(false)} />

        <ChatQuestionSection questions={questions} socket={socket} userType={userType} />

        <ChatListContainer>
          <ChatList messages={messages} userId={userId} />
        </ChatListContainer>

        <ChatInputContainer>
          <ChatInput socket={socket} userType={userType} />
        </ChatInputContainer>
      </ChatRoomContainer>
    </ChatProvider>
  );
};
export default ChatRoom;

const ChatOpenBtn = styled.button<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  height: 15px;
  background-color: #505050;
`;

const ChatRoomContainer = styled.aside<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  height: 100%;
  width: 380px;
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
