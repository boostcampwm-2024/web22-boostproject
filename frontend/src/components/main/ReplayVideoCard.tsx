import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReplayBadge, ReplayViewCountBadge } from './ThumbnailBadge';
import sampleProfile from '@assets/sample_profile.png';
import ShowInfoBadge from '@common/ShowInfoBadge';
import { ASSETS } from '@constants/assets';
import { ReplayStream } from '@type/replay';
import { useVideoPreview } from '@hooks/useVideoPreview';

interface ReplayVideoCardProps {
  videoData: ReplayStream;
}

const ReplayVideoCard = ({ videoData }: ReplayVideoCardProps) => {
  const navigate = useNavigate();

  const { category, channel, tags, thumbnailImageUrl, livePr, replayUrl, videoTitle, videoId } = videoData;

  const { isHovered, isVideoLoaded, videoRef, handleMouseEnter, handleMouseLeave } = useVideoPreview(replayUrl);

  const handleReplayClick = () => {
    navigate(`/replay/${videoId}`);
  };

  return (
    <VideoCardContainer>
      <ThumbnailContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleReplayClick}>
        <VideoBox $isVisible={isHovered && isVideoLoaded}>
          <video ref={videoRef} muted playsInline />
        </VideoBox>
        <VideoCardThumbnail $isVideoVisible={isHovered && isVideoLoaded}>
          <VideoCardImage src={thumbnailImageUrl} />
        </VideoCardThumbnail>
        <VideoCardDescription>
          <ReplayBadge />
          <ReplayViewCountBadge count={livePr} />
        </VideoCardDescription>
      </ThumbnailContainer>

      <VideoCardWrapper>
        <VideoCardProfile>
          <img src={sampleProfile} alt="profile" />
        </VideoCardProfile>
        <VideoCardArea>
          <span className="video_card_title" onClick={handleReplayClick}>
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
  position: relative;
  word-wrap: break-word;
  word-break: break-all;
`;

const ThumbnailContainer = styled.div`
  position: relative;
  cursor: pointer;
  padding-top: 56.25%;
  border-radius: 12px;
  overflow: hidden;
`;

const VideoBox = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out 0.6s;
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

const VideoCardThumbnail = styled.div<{ $isVideoVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #21242a url(${ASSETS.IMAGES.THUMBNAIL.DEFAULT}) no-repeat center center / cover;
  opacity: ${(props) => (props.$isVideoVisible ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
  z-index: 2;
`;

const VideoCardImage = styled.img`
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
  z-index: 3;
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
  display: block;
  overflow: hidden;
  margin-top: 5px;
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
    cursor: pointer;
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
