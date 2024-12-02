import styled from 'styled-components';

import { AsyncBoundary } from '@components/common/AsyncBoundary';
import { PlayerStreamError } from '@components/error';
import { ReplayView, Header } from '@components/replay';
import withReplayExistCheck from '@hocs/withReplayExistCheck';

function ReplayPageComponent() {
  return (
    <>
      <Header />
      <ReplayContainer>
        <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <PlayerStreamError />}>
          <ReplayView />
        </AsyncBoundary>
      </ReplayContainer>
    </>
  );
}

const ReplayPage = withReplayExistCheck(ReplayPageComponent);

export default ReplayPage;

const ReplayContainer = styled.div`
  box-sizing: border-box;
  padding: 60px 10px 0 10px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;
