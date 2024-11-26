import styled from 'styled-components';

import { ReplayView, Header } from '@components/replay';

export default function ReplayPage() {
  return (
    <>
      <Header />
      <ReplayContainer>
        <ReplayView />
      </ReplayContainer>
    </>
  );
}

const ReplayContainer = styled.div`
  box-sizing: border-box;
  padding: 60px 10px 0 10px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;
