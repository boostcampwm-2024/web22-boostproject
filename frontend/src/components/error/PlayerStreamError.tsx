import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import WarningIcon from '@assets/icons/warning_icon.svg';

const PlayerStreamError = () => {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <WarningIconStyled />
      <ErrorMainText>존재하지 않는 방송입니다.</ErrorMainText>
      <ErrorSubText>지금 입력하신 주소의 방송은 사라졌거나 다른 페이지로 변경되었습니다.</ErrorSubText>
      <ErrorSubText>주소를 다시 확인해주세요.</ErrorSubText>
      <HomeBox onClick={() => navigate('/')}>다른 방송 보러가기</HomeBox>
    </ErrorContainer>
  );
};

export default PlayerStreamError;

const WarningIconStyled = styled(WarningIcon)`
  color: ${({ theme }) => theme.tokenColors['text-weak']};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 90px);
  gap: 10px;
`;

const ErrorMainText = styled.h1`
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-bold24']}
  margin-bottom: 10px;
`;

const ErrorSubText = styled.p`
  color: ${({ theme }) => theme.tokenColors['text-weak']};
  ${({ theme }) => theme.tokenTypographys['body-medium16']}
`;

const HomeBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px 20px;
  justify-content: center;
  ${({ theme }) => theme.tokenTypographys['display-bold16']};
  background-color: ${({ theme }) => theme.colorMap.gray[900]};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colorMap.gray[700]};
  }
`;
