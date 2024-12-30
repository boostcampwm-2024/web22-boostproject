import styled from 'styled-components';

interface OfflineViewProps {
  openModal: () => void;
}

export default function OfflineView({ openModal }: OfflineViewProps) {
  return (
    <LivePlayerInner>
      <PlayerTitle>라이브 스트리밍을 시작하려면 스트리밍 소프트웨어를 연결하세요.</PlayerTitle>
      <PlayerDescription>방송 시작 및 종료는 스트리밍 소프트웨어에서 가능합니다.</PlayerDescription>
      <PlayerWrapper>
        <Button type="button" onClick={openModal}>
          스트리밍 설정 안내
        </Button>
      </PlayerWrapper>
    </LivePlayerInner>
  );
}

const LivePlayerInner = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const PlayerTitle = styled.p`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

const PlayerDescription = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 123px;
  height: 32px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #dddddd;
  font-size: 11.4375px;
  color: #697183;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;
