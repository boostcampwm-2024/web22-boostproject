import styled from 'styled-components';
import CloseIcon from '@assets/icons/close.svg';
import { useChat } from 'src/contexts/chatContext';
import { CHATTING_SOCKET_DEFAULT_EVENT } from '@constants/chat';
import { getStoredId } from '@utils/id';

interface UserInfoCardProps {
  worker: MessagePort | null;
  roomId: string;
}

export const UserInfoCard = ({ worker, roomId }: UserInfoCardProps) => {
  const { state, dispatch } = useChat();

  const toggleSettings = () => {
    dispatch({ type: 'CLOSE_USER_INFO_POPUP' });
  };

  const { selectedUser } = state;

  const userId = getStoredId();

  const onBan = () => {
    if (!worker) return;

    worker.postMessage({
      type: CHATTING_SOCKET_DEFAULT_EVENT.BAN_USER,
      payload: {
        socketId: selectedUser?.socketId,
        userId,
        roomId
      }
    });
  };

  return (
    <UserInfoCardContainer>
      <UserInfoCardHeader>
        <UserInfoCardWrapper>
          <UserInfoCardProfile></UserInfoCardProfile>
          <UserInfoCardArea>
            <div className="text_info">
              <span className="text_point">{selectedUser?.nickname}</span>
              <span>님</span>
            </div>
            <div className="entry_time">{selectedUser?.entryTime} 입장</div>
          </UserInfoCardArea>
        </UserInfoCardWrapper>
        <CloseBtn onClick={toggleSettings}>
          <StyledCloseIcon />
        </CloseBtn>
      </UserInfoCardHeader>

      <NoticeMessage>해당 방송이 진행되는 동안 채팅이 불가능하게 막을 수 있습니다.</NoticeMessage>
      <BanBtn onClick={onBan}>벤하기</BanBtn>
    </UserInfoCardContainer>
  );
};
export default UserInfoCard;

const UserInfoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 13px;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px #0d0d0da2;
  background-color: #202224;
  color: ${({ theme }) => theme.tokenColors['color-white']};
`;

const UserInfoCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const UserInfoCardWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfoCardProfile = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.tokenColors['surface-default']} no-repeat 50% / cover;
  border-radius: 50%;
  display: block;
  overflow: hidden;
  width: 60px;
  height: 60px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfoCardArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .text_info {
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['text-strong']};
  }
  .text_point {
    color: ${({ theme }) => theme.tokenColors['brand-default']};
  }
  .entry_time {
    ${({ theme }) => theme.tokenTypographys['display-medium12']}
    color: ${({ theme }) => theme.tokenColors['color-white']};
  }
`;

const CloseBtn = styled.button`
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  :hover {
    color: ${({ theme }) => theme.tokenColors['brand-default']};
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const NoticeMessage = styled.p`
  line-height: 20px;
  margin-top: 10px;
  max-height: 170px;
  overflow-y: auto;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
`;

const BanBtn = styled.button`
  background-color: pink;
  line-height: 20px;
  margin-top: 10px;
  max-height: 170px;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
`;
