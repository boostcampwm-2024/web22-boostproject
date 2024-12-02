import { useReducer, useEffect, useRef, useCallback } from 'react';
import { videoPlayerReducer, initialVideoPlayerState } from '@reducers/videoPlayerReducer';
import {
  setVolume,
  setCurrentTime,
  setDuration,
  setDvrEnabled,
  setAtLiveEdge,
  setBufferedSegments,
  setIsLive,
  setIsPlaying
} from '@reducers/actionCreators';
import { loadVolume, saveVolume } from '@utils/volume';
import Hls from 'hls.js';
import { VideoPlayerProps } from '@type/video';

interface UseVideoPlayerProps extends Pick<VideoPlayerProps, 'url' | 'isLive' | 'onTimeUpdate' | 'onDuration'> {
  playerContainerRef: React.RefObject<HTMLDivElement>;
}

const useVideoPlayer = ({ url, isLive = false, onTimeUpdate, onDuration, playerContainerRef }: UseVideoPlayerProps) => {
  const [state, dispatch] = useReducer(videoPlayerReducer, initialVideoPlayerState, (initial) => ({
    ...initial,
    volume: loadVolume(),
    isLive
  }));

  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (state.isPlaying) {
      video.pause();
    } else {
      video.play().catch((error) => {
        console.error('Playback error:', error);
      });
    }
  }, [state.isPlaying]);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !state.isMuted;
    dispatch(setVolume(video.muted ? 0 : state.volume));
  }, [state.isMuted, state.volume]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    dispatch(setVolume(newVolume));
    saveVolume(newVolume);
    video.volume = newVolume;
    video.muted = newVolume === 0;
  }, []);

  const seek = useCallback(
    (newTime: number) => {
      const video = videoRef.current;
      if (!video) return;

      video.currentTime = newTime;
      dispatch(setCurrentTime(newTime));
      onTimeUpdate?.(newTime);
    },
    [onTimeUpdate]
  );

  const goToLiveEdge = useCallback(() => {
    const video = videoRef.current;
    if (!video || !state.dvrEnabled) return;

    seek(video.duration);
    dispatch(setAtLiveEdge(true));
  }, [state.dvrEnabled, seek]);

  const toggleFullscreen = useCallback(() => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }, [playerContainerRef]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = video.currentTime;
    dispatch(setCurrentTime(newTime));
    onTimeUpdate?.(newTime);
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (url.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true
        });
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (isLive) {
            video.play().catch((error) => {
              console.error('Playback error:', error);
            });
          }
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          console.error('hls.js error:', data);
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        if (isLive) {
          video.play().catch((error) => {
            console.error('Playback error:', error);
          });
        }
      } else {
        console.error('Browser does not support HLS');
      }
    } else {
      video.src = url;
      if (isLive && state.isPlaying) {
        video.play().catch((error) => {
          console.error('Playback error:', error);
        });
      }
    }

    video.volume = state.volume;
    video.muted = state.isMuted;

    const handleProgress = () => {
      dispatch(setBufferedSegments(video.buffered));
    };

    const handleDurationChange = () => {
      const newDuration = video.duration;
      dispatch(setDuration(newDuration));
      dispatch(setDvrEnabled(isLive && newDuration > 60));
      onDuration?.(newDuration);
    };

    const handlePlay = () => {
      dispatch(setIsPlaying(true));
    };

    const handlePause = () => {
      dispatch(setIsPlaying(false));
    };

    const handleTimeUpdateEffect = () => {
      const newTime = video.currentTime;
      dispatch(setCurrentTime(newTime));
      onTimeUpdate?.(newTime);

      if (isLive) {
        dispatch(setAtLiveEdge(video.duration - newTime < 1));
      }
    };

    const handleEnded = () => {
      dispatch(setIsLive(video.currentTime >= video.duration));
    };

    const handleError = (e: Event) => {
      const error = (e.target as HTMLVideoElement).error;
      if (error) {
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            console.error('Video loading aborted');
            break;
          case error.MEDIA_ERR_NETWORK:
            console.error('Network error while loading video');
            break;
          case error.MEDIA_ERR_DECODE:
            console.error('Video decoding error');
            break;
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            console.error('Video format not supported');
            break;
          default:
            console.error('Unknown video error');
            break;
        }
      }
    };

    video.addEventListener('progress', handleProgress);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdateEffect);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdateEffect);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);

      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, isLive, onDuration, onTimeUpdate, state.volume, state.isMuted, state.isPlaying]);

  return {
    state,
    handlers: {
      handlePlayPause,
      handleMuteToggle,
      handleVolumeChange,
      handleTimeUpdate,
      seek,
      goToLiveEdge,
      toggleFullscreen,
      videoRef
    }
  };
};

export default useVideoPlayer;
