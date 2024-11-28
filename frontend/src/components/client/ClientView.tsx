import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Footer from '@common/Footer';
import Header from '@common/Header';
import { useClientLive } from '@queries/client/useFetchLive';

const ClientView = () => {
  const { id: liveId } = useParams();
  const { data: clientLiveData } = useClientLive({ liveId: liveId as string });

  if (!clientLiveData) {
    return <div>로딩 중...</div>;
  }

  return (
    <ClientViewContainer>
      <Header />
      <h1 className="hidden">클라이언트 페이지</h1>
      <Player videoUrl={clientLiveData.streamUrl} />
      <PlayerInfo clientLiveData={clientLiveData} />
      <Footer />
    </ClientViewContainer>
  );
};

export default ClientView;

const ClientViewContainer = styled.main`
  flex: 1;
  min-width: 400px;
  overflow-y: auto;
  padding: 0 60px;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
  scrollbar-width: none;
`;
