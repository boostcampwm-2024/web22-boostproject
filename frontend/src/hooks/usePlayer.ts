import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

export default function usePlayer(url: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !url) return;

    const isNativeHLS = videoElement.canPlayType('application/vnd.apple.mpegurl');

    if (isNativeHLS) {
      videoElement.src = url;
      videoElement.play();
      return;
    }

    const hls = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    });

    hls.loadSource(url);
    hls.attachMedia(videoElement);

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      videoElement.play();
    });

    return () => {
      hls.destroy();
    };
  }, []);

  return videoRef;
}
