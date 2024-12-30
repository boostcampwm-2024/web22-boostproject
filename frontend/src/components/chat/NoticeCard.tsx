import styled from 'styled-components';
import CloseIcon from '@assets/icons/close.svg';
import { useContext } from 'react';
import { ChatContext } from 'src/contexts/chatContext';

export const NoticeCard = () => {
  const { dispatch } = useContext(ChatContext);

  const toggleSettings = () => {
    dispatch({ type: 'TOGGLE_ANNOUNCEMENT_POPUP' });
  };

  return (
    <NoticeCardContainer>
      <NoticeCardHeader>
        <NoticeCardWrapper>
          <NoticeCardProfile></NoticeCardProfile>
          <NoticeCardArea>
            <div className="text_info">
              <span className="text_point">네이버 부스트 캠프</span>
              <span>님의</span>
            </div>
            <div className="text_strong">컨퍼런스 공지 📢</div>
          </NoticeCardArea>
        </NoticeCardWrapper>
        <CloseBtn onClick={toggleSettings}>
          <StyledCloseIcon />
        </CloseBtn>
      </NoticeCardHeader>

      <NoticeMessage>
        - 질문은 질문 채팅으로 부탁드립니다
        <br /> - 컨퍼런스 보러와주셔서 감사합니다
        <br /> - 컨퍼런스 보러와주셔서 감사합니다
        <br /> - 컨퍼런스 보러와주셔서 감사합니다
        <br /> - 컨퍼런스 보러와주셔서 감사합니다
      </NoticeMessage>
    </NoticeCardContainer>
  );
};
export default NoticeCard;

const NoticeCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 13px;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px #0d0d0da2;
  background-color: #202224;
  color: ${({ theme }) => theme.tokenColors['color-white']};
`;

const NoticeCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const NoticeCardWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NoticeCardProfile = styled.div`
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

const NoticeCardArea = styled.div`
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
  .text_strong {
    ${({ theme }) => theme.tokenTypographys['display-bold20']}
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
