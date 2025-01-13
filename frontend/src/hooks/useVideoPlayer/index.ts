import { useReducer, useRef, useCallback } from 'react';
import { videoPlayerReducer, initialVideoPlayerState } from '@reducers/videoPlayerReducer';
import { controlsReducer, initialControlsState } from '@reducers/controlsReducer';
import useHLSPlayer from './useHLSPlayer';
import useVideoEvents from './useVideoEvents';
import useVideoControls from './useVideoControls';
import { loadVolume, saveVolume } from '@utils/volume';

interface UseVideoPlayerProps {
  url: string;
  isLive: boolean;
  autoPlay: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDuration?: (duration: number) => void;
  playerContainerRef: React.RefObject<HTMLDivElement>;
}

const useVideoPlayer = ({
  url,
  isLive,
  autoPlay,
  onTimeUpdate,
  onDuration,
  playerContainerRef
}: UseVideoPlayerProps) => {
  const [videoState, videoDispatch] = useReducer(videoPlayerReducer, {
    ...initialVideoPlayerState,
    volume: loadVolume(),
    isLive
  });

  const [controlsState, controlsDispatch] = useReducer(controlsReducer, initialControlsState);

  const videoRef = useRef<HTMLVideoElement>(null);

  useHLSPlayer({ url, videoRef, isLive, autoPlay, dispatch: videoDispatch });
  useVideoEvents({ videoRef, dispatch: videoDispatch, isLive, onTimeUpdate, onDuration });
  useVideoControls({ dispatch: controlsDispatch, playerContainerRef });

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().catch(console.error);
    } else {
      video.pause();
    }
  }, []);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    videoDispatch({ type: 'SET_MUTED', payload: video.muted });
    saveVolume(video.volume);
  }, [videoDispatch]);

  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      const video = videoRef.current;
      if (!video) return;

      video.volume = newVolume;
      video.muted = newVolume === 0;
      videoDispatch({ type: 'SET_VOLUME', payload: newVolume });
      saveVolume(newVolume);
    },
    [videoDispatch]
  );

  const seek = useCallback(
    (newTime: number) => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = newTime;
      videoDispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
      onTimeUpdate?.(newTime);
    },
    [onTimeUpdate, videoDispatch]
  );

  const toggleFullscreen = useCallback(() => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  }, [playerContainerRef]);

  return {
    videoState,
    controlsState,
    videoHandlers: {
      handlePlayPause,
      handleMuteToggle,
      handleVolumeChange,
      seek,
      toggleFullscreen,
      videoRef
    }
  };
};

export default useVideoPlayer;
