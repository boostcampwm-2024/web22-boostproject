import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

export default function useRotatingPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const initPlayer = (url: string) => {
    const videoElement = videoRef.current;
    if (!videoElement || !url) return;

    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    });

    hlsRef.current = hls;
    hls.loadSource(url);
    hls.attachMedia(videoElement);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoElement.play();
    });
  };

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  return { videoRef, initPlayer };
}
