import { ASSETS } from '@constants/assets';
import styled from 'styled-components';

import sampleProfile from '@assets/sample_profile.png';
import ShowInfoBadge from '@common/ShowInfoBadge';
import { ReplayStream } from '@type/replay';
import { formatTimeDifference } from '@utils/formatTimeDifference';

const PlayerInfo = ({ clientReplayData }: { clientReplayData: ReplayStream }) => {
  const { channel, category, startDate, readCount, tags, videoTitle } = clientReplayData;

  const now = new Date();
  const startDateFormat = new Date(startDate);
  const formatTime = formatTimeDifference({ startDate: startDateFormat, now });

  return (
    <PlayerInfoContainer>
      <ReplayInfoBox>
        <VideoTitle>{videoTitle}</VideoTitle>
        <ReplayInfo>
          <p>조회수 {readCount}</p>
          <p>{formatTime}</p>
        </ReplayInfo>
      </ReplayInfoBox>
      <PlayerInfoBox>
        <HostProfileBox>
          <HostProfile>
            <img src={sampleProfile} />
          </HostProfile>
        </HostProfileBox>
        <VideoInfo>
          <VideoUploader>{channel.channelName}</VideoUploader>
          <Category>{category}</Category>
          <TagBox>
            {tags.map((tag, index) => (
              <ShowInfoBadge key={index} badgeType="tag" text={tag} />
            ))}
          </TagBox>
        </VideoInfo>
      </PlayerInfoBox>
      <BannerLink href="https://boostcamp.connect.or.kr/" target="_blank" rel="noopener noreferrer">
        <Banner src={ASSETS.IMAGES.BANNER.CLIENT} alt="Client Banner" />
      </BannerLink>
    </PlayerInfoContainer>
  );
};

export default PlayerInfo;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 8px;
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;

const VideoTitle = styled.h1`
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-bold24']};
`;

const ReplayInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ReplayInfo = styled.div`
  display: flex;
  gap: 16px;
  color: ${({ theme }) => theme.tokenColors['text-default']};
  ${({ theme }) => theme.tokenTypographys['display-bold14']};
`;

const PlayerInfoBox = styled.div`
  display: flex;
  gap: 16px;
`;

const HostProfileBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100px;
`;

const HostProfile = styled.div`
  position: relative;
  background: ${({ theme }) => theme.tokenColors['surface-alt']} no-repeat 50% / cover;
  border: 2px solid ${({ theme }) => theme.tokenColors['brand-default']};
  border-radius: 50%;
  display: block;
  overflow: hidden;
  position: relative;
  width: 70px;
  height: 70px;

  &:hover {
    outline: 4px solid ${({ theme }) => theme.tokenColors['brand-default']};
    outline-offset: -2px;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const VideoUploader = styled.p`
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-bold16']};
`;

const Category = styled.p`
  color: ${({ theme }) => theme.tokenColors['brand-default']};
  ${({ theme }) => theme.tokenTypographys['display-bold12']};
`;

const TagBox = styled.div`
  display: flex;
  gap: 8px;
`;

const BannerLink = styled.a`
  display: block;
  margin-top: 24px;
  border-radius: 7px;
  overflow: hidden;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Banner = styled.img`
  width: 100%;
  aspect-ratio: 16 / 2;
  object-fit: cover;
  display: block;
`;
