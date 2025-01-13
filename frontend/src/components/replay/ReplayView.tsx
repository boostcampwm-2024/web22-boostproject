import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Footer from '@common/Footer';
import Header from '@common/Header';
import { useClientReplay } from '@queries/replay/useFetchReplay';

const ReplayView = () => {
  const { id: videoId } = useParams();
  const { data: clientReplayData } = useClientReplay({ videoId: videoId as string });

  const { info } = clientReplayData;

  return (
    <ReplayViewContainer>
      <Header />
      <h1 className="hidden">다시보기 페이지</h1>
      <Player videoUrl={info.replayUrl} />
      <PlayerInfo clientReplayData={info} />
      <Footer />
    </ReplayViewContainer>
  );
};

export default ReplayView;

const ReplayViewContainer = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 0 60px;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
  scrollbar-width: none;
`;
