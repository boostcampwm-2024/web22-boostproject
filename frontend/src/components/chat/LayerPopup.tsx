import { useContext } from 'react';
import { ChatContext } from 'src/contexts/chatContext';
import styled from 'styled-components';

export const LayerPopup = () => {
  const { dispatch } = useContext(ChatContext);

  const openSetting = (option: 'chat_notice' | 'ai_summary' | null) => {
    dispatch({ type: 'SET_SETTING', payload: option });
  };

  return (
    <LayerPopupContainer>
      <LayerPopupWrapper>
        <LayerPopupButton onClick={() => openSetting('chat_notice')}>📢 채팅 규칙</LayerPopupButton>
        <LayerPopupButton onClick={() => openSetting('ai_summary')}>🤖 AI 요약 (준비 중)</LayerPopupButton>
      </LayerPopupWrapper>
    </LayerPopupContainer>
  );
};
export default LayerPopup;

const LayerPopupContainer = styled.div`
  width: 262px;
  background-color: #24272b;
  border-radius: 7px;
  box-shadow: 0px 4px 4px 0px #0d0d0da2;
  padding: 5px;
  gap: 1px;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
  color: ${({ theme }) => theme.tokenColors['color-white']};
`;

const LayerPopupWrapper = styled.div`
  :hover {
    background-color: #4343459f;
  }
`;

const LayerPopupButton = styled.button`
  width: 100%;
  text-align: start;
  padding: 8px;
  border-radius: 9px;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
  color: ${({ theme }) => theme.tokenColors['color-white']};
  cursor: pointer;
`;
