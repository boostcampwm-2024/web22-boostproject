import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Footer from '@common/Footer';
import Header from '@common/Header';
import { useClientLive } from '@queries/client/useFetchLive';
import { getLiveURL } from '@utils/getVideoURL';

const ClientView = () => {
  const { id: liveId } = useParams();
  const { data: clientLiveData } = useClientLive({
    liveId: liveId as string
  });

  const { info } = clientLiveData;

  return (
    <ClientViewContainer>
      <Header />
      <h1 className="hidden">클라이언트 페이지</h1>
      <Player videoUrl={getLiveURL(liveId as string)} />
      <PlayerInfo clientLiveData={info} />
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
