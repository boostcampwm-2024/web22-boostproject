import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@assets/icons/search_icon.svg';
import VideoIcon from '@assets/icons/video_icon.svg';
import { ASSETS } from '@constants/assets';

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <LogoContainer onClick={() => navigate('/')}>
        <img src={ASSETS.IMAGES.LOGO.GIF} alt="로고" />
      </LogoContainer>
      <SearchBox>
        <SearchInputWrapper>
          <SearchInput type="text" placeholder="컨퍼런스, 태그 검색" />
          <SearchIconStyled />
        </SearchInputWrapper>
        <SearchButton />
      </SearchBox>
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

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 10px 40px 10px 20px;
  border: 1px solid ${({ theme }) => theme.colorMap.gray[900]};
  border-radius: 20px;
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
  ${({ theme }) => theme.tokenTypographys['display-medium16']};

  &:focus {
    border-color: ${({ theme }) => theme.tokenColors['brand-default']};
    outline: none;
  }
`;

const SearchIconStyled = styled(SearchIcon)`
  position: absolute;
  top: 50%;
  right: -50px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.tokenColors['primary-default']};
  color: ${({ theme }) => theme.tokenColors['color-white']};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
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
