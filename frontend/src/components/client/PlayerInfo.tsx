import { ASSETS } from '@constants/assets';
import styled from 'styled-components';

import ElapsedTime from './ElapsedTime';
import sampleProfile from '@assets/sample_profile.png';
import ShowInfoBadge from '@common/ShowInfoBadge';
import { ClientLive } from '@type/live';

const PlayerInfo = ({ clientLiveData }: { clientLiveData: ClientLive }) => {
  const { channel, concurrentUserCount, liveTitle, category, tags, startDate } = clientLiveData;

  return (
    <PlayerInfoContainer>
      <VideoTitle>{liveTitle}</VideoTitle>
      <PlayerInfoBox>
        <HostProfileBox>
          <HostProfile>
            <img src={sampleProfile} />
          </HostProfile>
          <LiveBox>LIVE</LiveBox>
        </HostProfileBox>
        <VideoInfo>
          <VideoUploader>{channel.channelName}</VideoUploader>
          <Category>{category}</Category>
          <TagBox>
            {tags.map((tag, index) => (
              <ShowInfoBadge key={index} badgeType="tag" text={tag} />
            ))}
          </TagBox>
          <LiveInfo>
            <p>{concurrentUserCount}명 시청 중</p>
            <p>·</p>
            <ElapsedTime startDate={startDate} />
          </LiveInfo>
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
  margin-bottom: 24px;
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

const LiveBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.tokenColors['red-default']};
  color: ${({ theme }) => theme.tokenColors['text-strong']};
  ${({ theme }) => theme.tokenTypographys['display-bold14']};
  line-height: 1.2;
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

const LiveInfo = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.tokenColors['text-bold']};
  ${({ theme }) => theme.tokenTypographys['display-bold12']};
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
