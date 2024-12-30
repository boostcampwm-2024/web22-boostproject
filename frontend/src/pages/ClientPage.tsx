import styled from 'styled-components';

import { ClientChatRoom } from '@components/chat';
import { ClientView, Header } from '@components/client';
import { AsyncBoundary } from '@components/common/AsyncBoundary';
import { PlayerStreamError } from '@components/error';
import withLiveExistCheck from '@hocs/withLiveExistCheck';

function ClientPageComponent() {
  return (
    <>
      <Header />
      <ClientContainer>
        <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <PlayerStreamError />}>
          <ClientView />
          <ClientChatRoom />
        </AsyncBoundary>
      </ClientContainer>
    </>
  );
}

const ClientPage = withLiveExistCheck(ClientPageComponent);

export default ClientPage;

const ClientContainer = styled.div`
  box-sizing: border-box;
  padding-top: 70px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.tokenColors['susrface-default']};
`;
