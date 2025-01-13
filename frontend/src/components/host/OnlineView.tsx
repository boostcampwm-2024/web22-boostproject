import styled from 'styled-components';

import usePlayer from '@hooks/usePlayer';
import { getHostURL } from '@utils/hostURL';

export default function OnlineView() {
  const hostURL = getHostURL();
  const videoRef = usePlayer(hostURL);

  return (
    <LivePlayerActive>
      <Video ref={videoRef} controls tabIndex={0} autoPlay muted />
    </LivePlayerActive>
  );
}

const LivePlayerActive = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
