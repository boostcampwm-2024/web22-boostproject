import styled from 'styled-components';
import CloseIcon from '@assets/icons/close.svg';
import UserBlockIcon from '@assets/icons/user-block.svg';
import { useChat } from 'src/contexts/chatContext';
import { CHATTING_SOCKET_DEFAULT_EVENT } from '@constants/chat';
import { getStoredId } from '@utils/id';
import { UserType } from '@type/user';
import { parseDate } from '@utils/parseDate';
import { memo } from 'react';
import { usePortal } from '@hooks/usePortal';
import { useModal } from '@hooks/useModal';
import ConfirmModal from '@components/common/ConfirmModal';

interface UserInfoCardProps {
  worker: MessagePort | null;
  roomId: string;
  userType: UserType;
}

export const UserInfoCard = ({ worker, roomId, userType }: UserInfoCardProps) => {
  const { state, dispatch } = useChat();
  const { isOpen, closeModal, openModal } = useModal();
  const createPortal = usePortal();

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

    toggleSettings();
  };

  return (
    <UserInfoCardContainer>
      <UserInfoCardHeader>
        <UserInfoCardWrapper>
          <UserInfoCardArea>
            <div className="text_info">
              <span className="text_point">
                {selectedUser?.owner === 'host' && '[호스트] '}
                {selectedUser?.nickname}
              </span>
              <span>님</span>
            </div>
            <div className="entry_time">{parseDate(selectedUser?.entryTime as string)} 입장</div>
          </UserInfoCardArea>
        </UserInfoCardWrapper>
        <CloseBtn onClick={toggleSettings}>
          <StyledCloseIcon />
        </CloseBtn>
      </UserInfoCardHeader>
      {userType === 'host' && selectedUser?.owner === 'user' && (
        <>
          <BanBtn onClick={openModal}>
            <StyledUserBlockIcon />
            사용자 차단
          </BanBtn>
        </>
      )}
      {isOpen &&
        createPortal(
          <ConfirmModal
            title="사용자 차단"
            description="사용자 차단 시, 나의 모든 방송에서 해당 유저의 채팅이 금지됩니다."
            leftBtnText="취소"
            rightBtnText="차단하기"
            rightBtnAction={onBan}
            closeModal={closeModal}
          />
        )}
    </UserInfoCardContainer>
  );
};
export default memo(UserInfoCard);

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

const StyledUserBlockIcon = styled(UserBlockIcon)`
  width: 20px;
  height: 20px;
`;

const BanBtn = styled.button`
  &:hover {
    background-color: #313131;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 3px;
  border-radius: 7px;
  background-color: #101010;
  color: ${({ theme }) => theme.tokenColors['text-bold']};
  ${({ theme }) => theme.tokenTypographys['display-bold14']};
  cursor: pointer;
`;
