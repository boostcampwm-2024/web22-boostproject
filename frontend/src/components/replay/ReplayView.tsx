import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Player from './Player';
import PlayerInfo from './PlayerInfo';
import Footer from '@common/Footer';
import Header from '@common/Header';
import { useClientReplay } from '@queries/replay/useFetchReplay';
import { getReplayURL } from '@utils/getVideoURL';

const ReplayView = () => {
  const { id: videoId } = useParams();
  const { data: clientReplayData } = useClientReplay({ videoId: videoId as string });

  if (!clientReplayData) {
    return <div>로딩 중...</div>;
  }

  return (
    <ReplayViewContainer>
      <Header />
      <h1 className="hidden">다시보기 페이지</h1>
      <Player videoUrl={getReplayURL(videoId as string)} />
      <PlayerInfo clientReplayData={clientReplayData} />
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
