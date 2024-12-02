import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

interface PlayerController {
  play: () => Promise<void>;
  pause: () => void;
  reset: () => void;
  loadSource: (url: string) => void;
}

export default function usePreviewPlayer(): [React.RefObject<HTMLVideoElement>, PlayerController] {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const initializeHls = (url: string) => {
    const videoElement = videoRef.current;
    if (!videoElement || !url) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isNativeHLS = videoElement.canPlayType('application/vnd.apple.mpegurl');

    if (isNativeHLS) {
      videoElement.src = url;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });

      hlsRef.current = hls;
      hls.loadSource(url);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.ERROR, (_event, data) => {
        console.error('HLS.js error:', data);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  const playerController: PlayerController = {
    loadSource: (url: string) => {
      initializeHls(url);
    },
    play: async () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        return videoRef.current.play();
      }
      return Promise.reject('Video element not found');
    },
    pause: () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
    reset: () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current.load();
      }
    }
  };

  return [videoRef, playerController];
}
