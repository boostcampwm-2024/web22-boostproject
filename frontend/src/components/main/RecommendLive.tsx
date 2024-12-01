import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AnimatedProfileSection from './AnimatedProfileSection';
import AnimatedLiveHeader from './AnimatedLiveHeader';
import RecommendList from './RecommendList';
import sampleProfile from '@assets/sample_profile.png';
import { RECOMMEND_LIVE } from '@constants/recommendLive';
import useRotatingPlayer from '@hooks/useRotatePlayer';
import { useMainLive } from '@queries/main/useFetchMainLive';

const RecommendLive = () => {
  const navigate = useNavigate();
  const { videoRef, initPlayer } = useRotatingPlayer();
  const { data: mainLiveData } = useMainLive();
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const recommendListRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevUrlIndexRef = useRef(currentUrlIndex);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!mainLiveData) return;
    if (!mainLiveData[currentUrlIndex]) return;

    const handleTransition = async () => {
      const videoUrl = mainLiveData[currentUrlIndex].streamUrl;

      if (isInitialMount.current) {
        initPlayer(videoUrl);
        setTimeout(() => {
          isInitialMount.current = false;
        }, 100);
        return;
      }

      if (prevUrlIndexRef.current !== currentUrlIndex) {
        setIsTransitioning(true);
        await new Promise((resolve) => setTimeout(resolve, 200));

        initPlayer(videoUrl);
        prevUrlIndexRef.current = currentUrlIndex;

        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }
    };

    handleTransition();
  }, [mainLiveData, currentUrlIndex, initPlayer]);

  const onSelect = useCallback((index: number) => {
    setCurrentUrlIndex(index);
  }, []);

  const currentLiveData = useMemo(() => mainLiveData?.[currentUrlIndex], [mainLiveData, currentUrlIndex]);
  
  const { liveId, liveTitle, concurrentUserCount, channel, category } = currentLiveData;

  return (
    <RecommendLiveContainer $height={RECOMMEND_LIVE.HEIGHT}>
      <RecommendLiveBox $isTransitioning={isTransitioning}>
        <video ref={videoRef} autoPlay muted />
      </RecommendLiveBox>
      <RecommendLiveWrapper onClick={() => navigate(`/live/${liveId}`)}>
        <AnimatedLiveHeader concurrentUserCount={concurrentUserCount} liveTitle={liveTitle} />
        <RecommendLiveInformation>
          <AnimatedProfileSection channel={channel} category={category} profileImage={sampleProfile} />
          <RecommendList
            ref={recommendListRef}
            mainLiveData={mainLiveData}
            onSelect={onSelect}
            currentLiveId={liveId}
          />
        </RecommendLiveInformation>
      </RecommendLiveWrapper>
    </RecommendLiveContainer>
  );
};

export default RecommendLive;

const RecommendLiveContainer = styled.div<{ $height: string }>`
  word-wrap: break-word;
  background: #141517;
  border-radius: 12px;
  height: ${({ $height }) => $height};
  overflow: hidden;
  position: relative;
  word-break: break-all;
  z-index: 0;
`;

const RecommendLiveBox = styled.div<{ $isTransitioning: boolean }>`
  background: ${({ theme }) => theme.tokenColors['surface-default']};
  padding-top: 56.25%;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  box-shadow: inset 180px -180px 300px 0px #141517;
  opacity: ${({ $isTransitioning }) => ($isTransitioning ? 0 : 0.6)};
  transition: opacity 0.3s ease-in-out;

  video {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    object-fit: cover;
    object-position: center;
  }
`;

const RecommendLiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available;
  justify-content: space-between;
  padding: 22px 30px;
  position: relative;
  cursor: pointer;
`;

const RecommendLiveInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;
