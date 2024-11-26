import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Player from './StreamingDisplay';
import SettingForm from './SettingForm';
import { useBroadcastStatusPolling } from '@queries/host/useBroadcastStatusPolling';
import { getSessionKey } from '@utils/streamKey';


export default function Setting() {
  const [sessionKey, setSessionKey] = useState(getSessionKey());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentKey = getSessionKey();
      if (currentKey !== sessionKey) {
        setSessionKey(currentKey);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionKey]);

  const { data: onStreaming } = useBroadcastStatusPolling(sessionKey);

  return (
    <Container>
      <Player onStreaming={onStreaming} />
      <SettingForm />
    </Container>
  );
}

const Container = styled.main`
  flex: 1;
  overflow-y: auto;
`;
