import React, { forwardRef } from 'react';
import styled from 'styled-components';

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement>;

const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => <StyledVideo ref={ref} {...props} />);

Video.displayName = 'Video';

const MemoizedVideo = React.memo(Video);
MemoizedVideo.displayName = 'MemoizedVideo';

export default MemoizedVideo;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;