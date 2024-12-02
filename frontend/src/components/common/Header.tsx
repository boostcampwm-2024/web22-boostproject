import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import VideoIcon from '@assets/icons/video_icon.svg';
import { ASSETS } from '@constants/assets';

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LogoContainer onClick={() => navigate('/')}>
        <img src={ASSETS.IMAGES.LOGO.GIF} alt="로고" />
      </LogoContainer>
      <StudioBox onClick={() => navigate('/host')}>
        <VideoIconStyled />
        스튜디오
      </StudioBox>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  height: 60px;
  min-width: 800px;
  position: fixed;
  left: 45px;
  top: 0;
  right: 45px;
  z-index: 11000;
  background: ${({ theme }) => theme.tokenColors['surface-default']};
  color: ${({ theme }) => theme.tokenColors['text-strong']};
`;

const LogoContainer = styled.div`
  height: 20px;
  cursor: pointer;

  img {
    height: 100%;
  }
`;

const StudioBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px 0 0;
  ${({ theme }) => theme.tokenTypographys['display-bold16']};
  background-color: ${({ theme }) => theme.tokenColors['primary-default']};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  border: 1px solid ${({ theme }) => theme.colorMap.gray[900]};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colorMap.gray[900]};
  }
`;

const VideoIconStyled = styled(VideoIcon)``;
