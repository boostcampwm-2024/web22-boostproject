import { MainLive } from '@type/live';
import { useEffect, useRef, useState } from 'react';
import useRotatingPlayer from './useRotatePlayer';

const MOUNT_DELAY = 100;
const TRANSITION_DELAY = 300;

const useMainLiveRotation = (mainLiveData: MainLive[]) => {
  const { videoRef, initPlayer } = useRotatingPlayer();

  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevUrlIndexRef = useRef(currentUrlIndex);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!mainLiveData[currentUrlIndex]) return;

    const handleTransition = async () => {
      const videoUrl = mainLiveData[currentUrlIndex].streamUrl;

      if (isInitialMount.current) {
        initPlayer(videoUrl);
        setTimeout(() => {
          isInitialMount.current = false;
        }, MOUNT_DELAY);
        return;
      }

      if (prevUrlIndexRef.current !== currentUrlIndex) {
        setIsTransitioning(true);
        await new Promise((resolve) => setTimeout(resolve, TRANSITION_DELAY));
        initPlayer(videoUrl);
        prevUrlIndexRef.current = currentUrlIndex;

        setTimeout(() => {
          setIsTransitioning(false);
        }, MOUNT_DELAY);
      }
    };

    handleTransition();
  }, [mainLiveData, currentUrlIndex, initPlayer]);

  const onSelect = (index: number) => {
    setCurrentUrlIndex(index);
  };

  return {
    currentLiveData: mainLiveData[currentUrlIndex],
    currentUrlIndex,
    isTransitioning,
    videoRef,
    onSelect
  };
};

export default useMainLiveRotation;
