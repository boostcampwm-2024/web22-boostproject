import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import sampleProfile from '@assets/sample_profile.png';
import ShowInfoBadge from '@common/ShowInfoBadge';
import { ASSETS } from '@constants/assets';
import { ReplayStream } from '@type/replay';
import { ReplayBadge, ReplayViewCountBadge } from './ThumbnailBadge';

interface ReplayVideoCardProps {
  videoData: ReplayStream;
}

const ReplayVideoCard = ({ videoData }: ReplayVideoCardProps) => {
  const navigate = useNavigate();

  const { category, channel, tags, thumbnailImageUrl, livePr, videoTitle, videoId } = videoData;

  const handleReplayClick = () => {
    navigate(`/replay/${videoId}`);
  };

  return (
    <VideoCardContainer>
      <VideoCardThumbnail onClick={handleReplayClick}>
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
