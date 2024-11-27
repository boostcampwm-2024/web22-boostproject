import styled, { css } from 'styled-components';
import SpeechBubbleIcon from '@assets/icons/speech-bubble.svg';
import QuestionIcon from '@assets/icons/question.svg';
import SpeakerIcon from '@assets/icons/speaker.svg';
import SendIcon from '@assets/icons/send.svg';
import { useRef, useEffect, useState, ChangeEvent, KeyboardEvent, memo } from 'react';
import { CHATTING_SOCKET_SEND_EVENT, CHATTING_TYPES } from '@constants/chat';
import { ChattingTypes } from '@type/chat';
import { getStoredId } from '@utils/id';
import { UserType } from '@type/user';

interface ChatInputProps {
  worker: MessagePort | null;
  userType: UserType;
  roomId: string;
}

const INITIAL_TEXTAREA_HEIGHT = 15;

export const ChatInput = ({ worker, userType, roomId }: ChatInputProps) => {
  const [hasInput, setHasInput] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [msgType, setMsgType] = useState<ChattingTypes>(CHATTING_TYPES.NORMAL);
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const userId = getStoredId();

  const handleMsgType = () => {
    if (!userType) return;

    setMsgType(() => {
      if (userType === 'host') {
        return msgType === CHATTING_TYPES.NORMAL ? CHATTING_TYPES.NOTICE : CHATTING_TYPES.NORMAL;
      }
      return msgType === CHATTING_TYPES.NORMAL ? CHATTING_TYPES.QUESTION : CHATTING_TYPES.NORMAL;
    });
  };

  const handleMessageSend = () => {
    if (!worker || !message.trim()) return;

    const eventMap = {
      [CHATTING_TYPES.NORMAL]: CHATTING_SOCKET_SEND_EVENT.NORMAL,
      [CHATTING_TYPES.QUESTION]: CHATTING_SOCKET_SEND_EVENT.QUESTION,
      [CHATTING_TYPES.NOTICE]: CHATTING_SOCKET_SEND_EVENT.NOTICE
    };

    const eventName = eventMap[msgType];

    worker.postMessage({
      type: eventName,
      payload: {
        roomId,
        userId,
        msg: message
      }
    });

    resetTextareaHeight();
    setMessage('');
    setHasInput(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setHasInput(e.target.value.length > 0);
  };

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${INITIAL_TEXTAREA_HEIGHT}px`;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    const handleResize = () => {
      if (textarea) {
        requestAnimationFrame(() => {
          textarea.style.height = `${INITIAL_TEXTAREA_HEIGHT}px`;
          textarea.style.height = `${textarea.scrollHeight - 5}px`;
        });
      }
    };

    if (textarea) {
      textarea.addEventListener('input', handleResize);
      handleResize();
    }

    return () => {
      if (textarea) {
        textarea.removeEventListener('input', handleResize);
      }
    };
  }, [textareaRef.current]);

  const handleBlur = () => {
    if (textareaRef.current) {
      setHasInput(textareaRef.current.value.length > 0);
      setIsFocused(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleMessageSend();
    }
  };

  const getButtonIcon = () => {
    switch (msgType) {
      case CHATTING_TYPES.NORMAL: {
        return <StyledIcon as={SpeechBubbleIcon} />;
      }
      case CHATTING_TYPES.QUESTION: {
        return <StyledIcon as={QuestionIcon} />;
      }
      case CHATTING_TYPES.NOTICE: {
        return <StyledIcon as={SpeakerIcon} />;
      }
      default: {
        return <StyledIcon as={SendIcon} />;
      }
    }
  };

  return (
    <ChatInputWrapper $hasInput={hasInput} $isFocused={isFocused}>
      <InputBtn aria-label={msgType} onClick={handleMsgType}>
        {getButtonIcon()}
      </InputBtn>

      <ChatInputArea
        ref={textareaRef}
        value={message}
        onChange={handleInputChange}
        placeholder={`${
          msgType === CHATTING_TYPES.NORMAL ? '채팅을' : msgType === CHATTING_TYPES.QUESTION ? '질문을' : '공지를'
        } 입력해주세요`}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      <InputBtn aria-label="전송" onClick={handleMessageSend}>
        <StyledIcon as={SendIcon} />
      </InputBtn>
    </ChatInputWrapper>
  );
};

export default memo(ChatInput);

const ChatInputWrapper = styled.div<{ $hasInput: boolean; $isFocused: boolean }>`
  min-height: 20px;
  display: flex;
  padding: 7px 10px 5px 10px;
  gap: 10px;
  border: 3px solid ${({ theme }) => theme.tokenColors['text-weak']};
  border-radius: 7px;
  background-color: transparent;

  ${({ $isFocused, $hasInput }) =>
    !$hasInput &&
    !$isFocused &&
    css`
      border: 3px solid transparent;
      background-color: #373a3f;
    `}
`;

const ChatInputArea = styled.textarea`
  width: 100%;
  max-height: 65px;
  scrollbar-width: none;
  resize: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-medium16']};
  background-color: transparent;
  white-space: normal;
  line-height: 20px;
`;

const InputBtn = styled.button`
  display: flex;
  height: 25px;
  align-items: center;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.tokenColors['brand-default']};
  }
`;

const StyledIcon = styled.svg`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
