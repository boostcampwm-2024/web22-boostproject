import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LiveBadgeLarge } from './ThumbnailBadge';
import { useMainLive } from '@queries/main/useFetchMainLive';
import sampleProfile from '@assets/sample_profile.png';
import useRotatingPlayer from '@hooks/useRotatePlayer';
import RecommendList from './RecommendList';
import { getLiveURL } from '@utils/getVideoURL';

const RecommendLive = () => {
  const navigate = useNavigate();
  
  const { videoRef, initPlayer } = useRotatingPlayer();
  const { data: mainLiveData, isLoading, error } = useMainLive();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  useEffect(() => {
    if (!mainLiveData || !mainLiveData[currentUrlIndex]) return;

    const playVideo = () => {
      const liveId = mainLiveData[currentUrlIndex].liveId;
      const videoUrl = getLiveURL(liveId);
      initPlayer(videoUrl);
    };

    playVideo();
  }, [mainLiveData, currentUrlIndex, initPlayer]);

  if (error) {
    return <div>데이터를 가져오는 중 에러가 발생했습니다.</div>;
  }

  if (!mainLiveData || mainLiveData.length === 0) {
    return <div>추천 라이브 데이터가 없습니다.</div>;
  }

  const liveData = mainLiveData[currentUrlIndex];
  const { liveId, liveTitle, concurrentUserCount, channel, category } = liveData;

  const onSelect = (index: number) => {
    setCurrentUrlIndex(index);
  };

  return (
    <RecommendLiveContainer>
      <RecommendLiveBox $isLoading={isLoading}>
        <video ref={videoRef} autoPlay muted />
      </RecommendLiveBox>
      <RecommendLiveWrapper onClick={() => navigate(`/live/${liveId}`)}>
        <RecommendLiveHeader>
          <div className="recommend_live_status">
            <LiveBadgeLarge />
            <span>{concurrentUserCount}명 시청</span>
          </div>
          <p className="recommend_live_title">{liveTitle}</p>
        </RecommendLiveHeader>

        <RecommendLiveInformation>
          <Flex>
            <RecommendLiveProfile>
              <img src={sampleProfile} alt="profile" />
            </RecommendLiveProfile>
            <RecommendLiveArea>
              <span className="video_card_name">{channel.channelName}</span>
              <span className="video_card_category">{category}</span>
            </RecommendLiveArea>
          </Flex>
          <RecommendList
            mainLiveData={mainLiveData}
            onSelect={onSelect}
            currentLiveId={mainLiveData[currentUrlIndex].liveId}
          />
        </RecommendLiveInformation>
      </RecommendLiveWrapper>
    </RecommendLiveContainer>
  );
};

export default RecommendLive;

const RecommendLiveContainer = styled.div`
  word-wrap: break-word;
  background: #141517;
  border-radius: 12px;
  height: 370px;
  overflow: hidden;
  position: relative;
  word-break: break-all;
  z-index: 0;
`;

const RecommendLiveBox = styled.div<{ $isLoading: boolean }>`
  background: ${({ $isLoading, theme }) => ($isLoading ? theme.tokenColors['surface-default'] : '')};
  padding-top: 56.25%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  z-index: -1;
  box-shadow: inset 180px -180px 300px 0px #141517;
  opacity: 0.6;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;

    &.transitioning {
      opacity: 0;
    }
  }
`;

const RecommendLiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 24px 30px 30px;
  position: relative;
  cursor: pointer;
`;

const RecommendLiveHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .recommend_live_status {
    display: flex;
    align-items: center;
    gap: 10px;
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['red-default']};
  }
  .recommend_live_title {
    ${({ theme }) => theme.tokenTypographys['display-bold24']}
    color: ${({ theme }) => theme.tokenColors['color-white']};
  }
`;

const RecommendLiveInformation = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  flex-grow: 0.5;
  justify-content: space-between;
`;

const RecommendLiveProfile = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.tokenColors['surface-alt']} no-repeat 50% / cover;
  border: 2px solid ${({ theme }) => theme.tokenColors['brand-default']};
  border-radius: 50%;
  display: block;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  width: 70px;
  height: 70px;

  &:hover {
    outline: 4px solid ${({ theme }) => theme.tokenColors['brand-default']};
    outline-offset: -2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecommendLiveArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .video_card_name {
    ${({ theme }) => theme.tokenTypographys['display-bold20']}
    color: ${({ theme }) => theme.tokenColors['text-strong']};
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .video_card_category {
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['brand-default']};
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Flex = styled.div`
  display: flex;
`;
