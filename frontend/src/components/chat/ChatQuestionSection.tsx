import { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
import { MessageReceiveData, MessageSendData } from '@type/chat';
import { CHATTING_SOCKET_SEND_EVENT } from '@constants/chat';
import { getStoredId } from '@utils/id';
import { UserType } from '@type/user';

export interface ChatQuestionSectionProps {
  questions: MessageReceiveData[];
  worker: MessagePort | null;
  userType: UserType;
  roomId: string;
}

const ChatQuestionSection = ({ questions, worker, userType, roomId }: ChatQuestionSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const userId = getStoredId();

  const toggleSection = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleQuestionDone = useCallback(
    (questionId: number) => {
      if (!worker) return;

      worker.postMessage({
        type: CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE,
        payload: {
          roomId,
          userId,
          questionId
        } as MessageSendData
      });
    },
    [worker, roomId, userId]
  );

  return (
    <SectionWrapper>
      <SectionContainer>
        {questions.length === 0 ? (
          <NoQuestionMessage>아직 질문이 없어요 ( °ᗝ° ).ᐟ.ᐟ</NoQuestionMessage>
        ) : (
          <>
            <QuestionCard
              key={questions[0].questionId}
              type={userType}
              question={questions[0]}
              handleQuestionDone={handleQuestionDone}
              ellipsis={!expanded}
            />
            {expanded &&
              questions
                .slice(1)
                .map((question) => (
                  <QuestionCard
                    key={question.questionId}
                    type={userType}
                    question={question}
                    handleQuestionDone={handleQuestionDone}
                  />
                ))}
            <SwipeBtn onClick={toggleSection} />
          </>
        )}
      </SectionContainer>
    </SectionWrapper>
  );
};

export default memo(ChatQuestionSection);

const SectionWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #090909;
  border-top: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  border-bottom: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 25px;
  max-height: 300px;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 13px 20px 25px 20px;
  gap: 10px;
`;

const SwipeBtn = memo(styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  cursor: pointer;
  background-color: #090909;
  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    background-color: ${({ theme }) => theme.tokenColors['text-weak']};
    border-radius: 2px;
    height: 4px;
    width: 60px;
    transform: translate(-50%, -50%);
  }
`);

const NoQuestionMessage = styled.div`
  text-align: center;
  ${({ theme }) => theme.tokenTypographys['display-medium14']};
  color: ${({ theme }) => theme.tokenColors['text-weak']};
  padding: 15px 0 0 0;
`;
