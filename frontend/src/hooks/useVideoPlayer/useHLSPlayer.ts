import { useEffect } from 'react';
import Hls from 'hls.js';
import { VideoPlayerAction } from '@reducers/videoPlayerReducer';

interface UseHLSPlayerProps {
  url: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  isLive: boolean;
  autoPlay: boolean;
  dispatch: React.Dispatch<VideoPlayerAction>;
}

const useHLSPlayer = ({ url, videoRef, isLive, autoPlay, dispatch }: UseHLSPlayerProps) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) {
          video.play().catch(console.error);
        }
      });

      hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
        dispatch({ type: 'SET_DURATION', payload: data.details.totalduration });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      if (autoPlay) {
        video.play().catch(console.error);
      }
    } else {
      console.error('HLS를 지원하지 않는 브라우저입니다.');
    }
  }, [url, videoRef, isLive, autoPlay, dispatch]);
};

export default useHLSPlayer;
