import { useEffect, useState } from 'react';
import SharedWorker from '@utils/chatWorker?sharedworker';
import { CHATTING_SOCKET_DEFAULT_EVENT, CHATTING_SOCKET_RECEIVE_EVENT } from '@constants/chat';
import { MessageReceiveData } from '@type/chat';

export const useChatRoom = (roomId: string, userId: string) => {
  const [worker, setWorker] = useState<SharedWorker | null>(null);
  const [messages, setMessages] = useState<MessageReceiveData[]>([]);
  const [questions, setQuestions] = useState<MessageReceiveData[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const worker = new SharedWorker();
    setWorker(worker);

    worker.port.start();
    worker.port.postMessage({
      type: CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM,
      payload: { roomId, userId }
    });

    worker.port.onmessage = (event) => {
      const { type, payload } = event.data;

      switch (type) {
        case CHATTING_SOCKET_RECEIVE_EVENT.INIT:
          setQuestions(payload.questionList);
          break;
        case CHATTING_SOCKET_RECEIVE_EVENT.NORMAL:
        case CHATTING_SOCKET_RECEIVE_EVENT.NOTICE:
          setMessages((prevMessages) => [...prevMessages, payload]);
          break;
        case CHATTING_SOCKET_RECEIVE_EVENT.QUESTION:
          setMessages((prevMessages) => [...prevMessages, payload]);
          setQuestions((prevQuestions) => [payload, ...prevQuestions]);
          break;
        case CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE:
          setQuestions((prevQuestions) => prevQuestions.filter((message) => message.questionId !== payload.questionId));
          break;
        case CHATTING_SOCKET_DEFAULT_EVENT.EXCEPTION:
          payload.msgType = 'exception';
          setMessages((prevMessages) => [...prevMessages, payload]);
          break;
        case 'logging':
          console.log(payload);
          break;
        default:
          break;
      }
    };

    return () => {
      worker.port.close();
    };
  }, [roomId, userId]);

  return { worker: worker?.port ?? null, messages, questions };
};
