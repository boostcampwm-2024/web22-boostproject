import styled from 'styled-components';

import { ReplayView, Header } from '@components/replay';
import withReplayExistCheck from '@hocs/withReplayExistCheck';

function ReplayPageComponent() {
  return (
    <>
      <Header />
      <ReplayContainer>
        <ReplayView />
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
