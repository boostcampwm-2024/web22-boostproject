import usePreviewPlayer from '@hooks/useVideoPreview/usePreviewPlayer';
import { useEffect, useRef, useState } from 'react';

interface UseVideoPreviewReturn {
  isHovered: boolean;
  isVideoLoaded: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const useVideoPreview = (url: string, hoverDelay: number = 400): UseVideoPreviewReturn => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [videoRef, playerController] = usePreviewPlayer();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      playerController.reset();
    };
  }, [playerController]);

  useEffect(() => {
    const clearHoverTimeout = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };

    if (isHovered) {
      clearHoverTimeout();
      hoverTimeoutRef.current = setTimeout(() => {
        playerController.loadSource(url);
        playerController.play();
      }, hoverDelay);
    } else {
      clearHoverTimeout();
      playerController.reset();
    }

    return clearHoverTimeout;
  }, [isHovered, isVideoLoaded, url, hoverDelay, playerController]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    isHovered,
    isVideoLoaded,
    videoRef,
    handleMouseEnter,
    handleMouseLeave
  };
};
