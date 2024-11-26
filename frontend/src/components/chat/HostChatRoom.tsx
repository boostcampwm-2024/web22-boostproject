import { useEffect, useState } from 'react';

import { ChatRoomLayout } from './ChatRoomLayout';
import { getStoredId } from '@utils/id';
import useFetchStreamKey from '@queries/host/useFetchStreamKey';

import { useChatRoom } from '@hooks/useChatRoom';
import { ChatProvider } from 'src/contexts/chatContext';

const HostChatRoom = () => {
  const userId = getStoredId();
  const [sessionKey, setSessionKey] = useState<string | null>(null);
  const { mutate: fetchSessionKey } = useFetchStreamKey({
    onSuccess: ({ sessionKey }) => setSessionKey(sessionKey)
  });

  useEffect(() => {
    if (userId && !sessionKey) fetchSessionKey(userId);
  }, [userId, fetchSessionKey, sessionKey]);

  const { worker, messages, questions } = useChatRoom(sessionKey as string, userId);
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(true);

  if (!sessionKey) return <div>세션 키 로딩 중...</div>;

  return (
    <ChatProvider>
      <ChatRoomLayout
        worker={worker?.port ?? null}
        messages={messages}
        questions={questions}
        userId={userId}
        userType={'host'}
        roomId={sessionKey}
        isChatRoomVisible={isChatRoomVisible}
        setIsChatRoomVisible={setIsChatRoomVisible}
      />
    </ChatProvider>
  );
};

export default HostChatRoom;
