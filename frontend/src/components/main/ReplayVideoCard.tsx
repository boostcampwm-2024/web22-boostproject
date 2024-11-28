import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReplayBadge, ReplayViewCountBadge } from './ThumbnailBadge';
import sampleProfile from '@assets/sample_profile.png';
import ShowInfoBadge from '@common/ShowInfoBadge';
import { ASSETS } from '@constants/assets';
import usePlayer from '@hooks/usePlayer';
import { ReplayStream } from '@type/replay';
import { getReplayURL } from '@utils/getVideoURL';

interface ReplayVideoCardProps {
  videoData: ReplayStream;
}

const ReplayVideoCard = ({ videoData }: ReplayVideoCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { category, channel, tags, thumbnailImageUrl, livePr, videoTitle, videoId } = videoData;

  const videoRef = usePlayer(getReplayURL(videoId));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const resetVideo = () => {
      video.pause();
      video.currentTime = 0;
    };

    const playVideo = () => {
      video.currentTime = 0;
      video.play();
    };

    const clearHoverTimeout = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };

    if (isHovered) {
      hoverTimeoutRef.current = setTimeout(playVideo, 500);
      return;
    }

    clearHoverTimeout();
    resetVideo();

    return clearHoverTimeout;
  }, [isHovered]);

  const handleReplayClick = () => {
    navigate(`/replay/${videoId}`);
  };

  return (
    <VideoCardContainer>
      <VideoCardThumbnail
        onClick={handleReplayClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <VideoBox $isVisible={isHovered}>
          <video ref={videoRef} muted playsInline />
        </VideoBox>
        <VideoCardImage src={thumbnailImageUrl} />
        <VideoCardDescription>
          <ReplayBadge />
          <ReplayViewCountBadge count={livePr} />
        </VideoCardDescription>
      </VideoCardThumbnail>

      <VideoCardWrapper>
        <VideoCardProfile>
          <img src={sampleProfile} />
        </VideoCardProfile>
        <VideoCardArea>
          <span className="video_card_title" style={{ cursor: 'pointer' }} onClick={handleReplayClick}>
            {videoTitle}
          </span>
          <span className="video_card_name">{channel.channelName}</span>
          <VideoCardInformation>
            <ShowInfoBadge badgeType="category" text={category} />
            {tags.map((tag, index) => (
              <ShowInfoBadge key={index} badgeType="tag" text={tag} />
            ))}
          </VideoCardInformation>
        </VideoCardArea>
      </VideoCardWrapper>
    </VideoCardContainer>
  );
};

export default ReplayVideoCard;

const VideoCardContainer = styled.div`
  word-wrap: break-word;
  word-break: break-all;
`;

const VideoCardThumbnail = styled.div`
  background: #21242a url(${ASSETS.IMAGES.THUMBNAIL.DEFAULT}) no-repeat center center / cover;
  overflow: hidden;
  border-radius: 12px;
  display: block;
  padding-top: 56.25%;
  position: relative;
  cursor: pointer;
`;

const VideoBox = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  z-index: 1;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
  }
`;

const VideoCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoCardDescription = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 4px;
`;

const VideoCardWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  min-width: 0;
`;

const VideoCardProfile = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.tokenColors['surface-alt']} no-repeat 50% / cover;
  border-radius: 50%;
  margin-top: 5px;
  display: block;
  overflow: hidden;
  width: 40px;
  height: 40px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoCardArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  .video_card_title {
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['text-strong']};
    margin-bottom: 8px;
  }
  .video_card_name {
    ${({ theme }) => theme.tokenTypographys['display-medium14']}
    color: ${({ theme }) => theme.tokenColors['text-bold']};
    margin-bottom: 6px;
  }
`;

const VideoCardInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
