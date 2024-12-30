import { HostChatRoom } from '@components/chat';
import { Setting, Header } from '@components/host';
import styled from 'styled-components';

export default function HostPage() {
  return (
    <>
      <Header />
      <FlexContainer>
        <Setting />
        <HostChatRoom />
      </FlexContainer>
    </>
  );
}

const FlexContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  display: flex;
  padding-top: 60px;
`;
