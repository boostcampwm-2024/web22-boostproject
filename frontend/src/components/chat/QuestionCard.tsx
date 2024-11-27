import styled from 'styled-components';
import CheckIcon from '@assets/icons/check.svg';
import { MessageReceiveData } from '@type/chat';
import QuestionUserIcon from '@assets/icons/question_user_icon.svg';

interface QuestionCardProps {
  type: 'host' | 'client';
  question: MessageReceiveData;
  handleQuestionDone?: (questionId: number) => void;
  ellipsis?: boolean;
}

export const QuestionCard = ({ type, question, handleQuestionDone, ellipsis = false }: QuestionCardProps) => {
  return (
    <QuestionCardContainer>
      <QuestionCardTop>
        <QuestionInfo>
          <span className="name_info">
            <StyledIcon as={QuestionUserIcon} /> {question.nickname}
          </span>
          <span className="time_info">n분전</span>
        </QuestionInfo>
        {type === 'host' && handleQuestionDone && (
          <CheckBtn onClick={() => handleQuestionDone(question.questionId as number)}>
            <StyledCheckIcon />
          </CheckBtn>
        )}
      </QuestionCardTop>

      <QuestionCardBottom $ellipsis={ellipsis}>{question.msg}</QuestionCardBottom>
    </QuestionCardContainer>
  );
};
export default QuestionCard;

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
    ${({ theme }) => theme.tokenTypographys['display-bold12']}
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
  /* max-height: 80px; */
  overflow-y: scroll;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
  padding: 10px 15px 0 15px;
  overflow-y: ${({ $ellipsis }) => ($ellipsis ? 'hidden' : 'scroll')};
  white-space: ${({ $ellipsis }) => ($ellipsis ? 'nowrap' : 'normal')};
  text-overflow: ${({ $ellipsis }) => ($ellipsis ? 'ellipsis' : 'clip')};
  overflow-wrap: ${({ $ellipsis }) => ($ellipsis ? 'unset' : 'break-word')};
  word-break: ${({ $ellipsis }) => ($ellipsis ? 'unset' : 'break-word')};
`;

const StyledIcon = styled.svg`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin: 0 5px -4px 0;
`;
