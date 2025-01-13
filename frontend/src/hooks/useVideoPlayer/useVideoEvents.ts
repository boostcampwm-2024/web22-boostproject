import { useEffect } from 'react';
import { VideoPlayerAction } from '@reducers/videoPlayerReducer';

interface UseVideoEventsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  dispatch: React.Dispatch<VideoPlayerAction>;
  isLive: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDuration?: (duration: number) => void;
}

const useVideoEvents = ({ videoRef, dispatch, isLive, onTimeUpdate, onDuration }: UseVideoEventsProps) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      dispatch({ type: 'SET_CURRENT_TIME', payload: currentTime });
      onTimeUpdate?.(currentTime);
    };

    const handleDurationChange = () => {
      const duration = video.duration;
      dispatch({ type: 'SET_DURATION', payload: duration });
      onDuration?.(duration);
    };

    const handlePlay = () => {
      dispatch({ type: 'SET_IS_PLAYING', payload: true });
    };

    const handlePause = () => {
      dispatch({ type: 'SET_IS_PLAYING', payload: false });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoRef, dispatch, isLive, onTimeUpdate, onDuration]);
};

export default useVideoEvents;
