import { useParams } from 'react-router-dom';
import { ChatRoomLayout } from './ChatRoomLayout';

import { ChatProvider } from 'src/contexts/chatContext';

const ClientChatRoom = () => {
  const { id: roomId } = useParams();

  return (
    <ChatProvider>
      <ChatRoomLayout userType={'client'} roomId={roomId as string} />
    </ChatProvider>
  );
};

export default ClientChatRoom;
