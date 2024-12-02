import { memo, useEffect, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import CheckIcon from '@assets/icons/check.svg';
import { MessageReceiveData } from '@type/chat';
import QuestionUserIcon from '@assets/icons/question_user_icon.svg';
import { formatTimeDifference } from '@utils/formatTimeDifference';

interface QuestionCardProps {
  type: 'host' | 'client';
  question: MessageReceiveData;
  handleQuestionDone?: (questionId: number) => void;
  ellipsis?: boolean;
  onNicknameClick: () => void;
}

const QuestionCard = ({ type, question, handleQuestionDone, onNicknameClick, ellipsis = false }: QuestionCardProps) => {
  const startDateFormat = useMemo(() => new Date(question.msgTime), [question.msgTime]);
  const nowRef = useRef<Date>(new Date());

  const formatTime = useRef<string>(formatTimeDifference({ startDate: startDateFormat, now: nowRef.current }));

  useEffect(() => {
    const interval = setInterval(() => {
      nowRef.current = new Date();
      const updatedTime = formatTimeDifference({ startDate: startDateFormat, now: nowRef.current });

      if (formatTime.current !== updatedTime) {
        formatTime.current = updatedTime;
        if (timeElement.current) {
          timeElement.current.innerText = updatedTime;
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDateFormat]);

  const timeElement = useRef<HTMLSpanElement>(null);

  const handleQuestionDoneMemoized = useCallback(() => {
    if (handleQuestionDone) {
      handleQuestionDone(question.questionId as number);
    }
  }, [handleQuestionDone, question.questionId]);

  const onNicknameClickMemoized = useCallback(() => {
    onNicknameClick();
  }, [onNicknameClick]);

  return (
    <QuestionCardContainer>
      <QuestionCardTop>
        <QuestionInfo>
          <span className="name_info" onClick={onNicknameClickMemoized}>
            <StyledIcon as={QuestionUserIcon} /> {question.nickname}
          </span>
          <span className="time_info" ref={timeElement}>
            {formatTime.current}
          </span>
        </QuestionInfo>
        {type === 'host' && handleQuestionDone && (
          <CheckBtn onClick={handleQuestionDoneMemoized}>
            <StyledCheckIcon />
          </CheckBtn>
        )}
      </QuestionCardTop>

      <QuestionCardBottom $ellipsis={ellipsis}>{question.msg}</QuestionCardBottom>
    </QuestionCardContainer>
  );
};

// shouldComponentUpdate를 내부에서 사용할 수 있도록 memo 사용
export default memo(QuestionCard, (prevProps, nextProps) => {
  return (
    prevProps.question.questionId === nextProps.question.questionId &&
    prevProps.type === nextProps.type &&
    prevProps.ellipsis === nextProps.ellipsis
  );
});

const QuestionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  background-color: #463272;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5), inset 1px 1px 1px hsla(0, 0%, 100%, 0.1);
  color: ${({ theme }) => theme.tokenColors['color-white']};
  overflow-wrap: break-word;
  word-break: break-word;
  padding-bottom: 10px;
`;

const QuestionCardTop = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #311e56;
  padding: 10px 10px 7px 10px;
  border-radius: 7px 7px 0 0;
`;

const QuestionInfo = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  .name_info {
    border-radius: 7px;
    ${({ theme }) => theme.tokenTypographys['display-bold12']};
    cursor: pointer;
    &:hover {
      color: #bbbbbb;
    }
  }
  .time_info {
    ${({ theme }) => theme.tokenTypographys['display-medium12']}
    color: ${({ theme }) => theme.tokenColors['text-strong']};
  }
`;

const CheckBtn = styled.button`
  display: flex;
  align-items: end;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  :hover {
    color: ${({ theme }) => theme.tokenColors['brand-default']};
  }
`;

const StyledCheckIcon = styled(CheckIcon)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const QuestionCardBottom = styled.div<{ $ellipsis: boolean }>`
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
  padding: 10px 15px 0 15px;
  white-space: ${({ $ellipsis }) => ($ellipsis ? 'nowrap' : 'normal')};
  text-overflow: ${({ $ellipsis }) => ($ellipsis ? 'ellipsis' : 'clip')};
  overflow-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
`;

const StyledIcon = styled.svg`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0 5px -4px 0;
`;
