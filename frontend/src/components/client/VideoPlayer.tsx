import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Maximize, Play, Pause } from 'lucide-react';
import styled from 'styled-components';
import usePlayer from '@hooks/usePlayer';

interface VideoPlayerProps {
  url: string;
  isLive?: boolean;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  onDuration?: (duration: number) => void;
}

interface StyledProps {
  $progress?: number;
  $buffered?: number;
  $isLive?: boolean;
  $dvr?: boolean;
  $isVisible?: boolean;
  $isPlaying?: boolean;
  $isMuted?: boolean;
  $isActive?: boolean;
  $pos?: number;
  $volume?: number;
  $isControlsVisible?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isLive = false, onTimeUpdate, onDuration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(() => {
    // localStorage에서 볼륨값을 가져오거나 기본값 1 사용
    const savedVolume = localStorage.getItem('videoPlayerVolume');
    return savedVolume ? parseFloat(savedVolume) : 1;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [dvrEnabled, setDvrEnabled] = useState(false);
  const [isAtLiveEdge, setIsAtLiveEdge] = useState(true);
  const [bufferedSegments, setBufferedSegments] = useState<TimeRanges | null>(null);
  const [previewTime, setPreviewTime] = useState<number | null>(null);
  const [previewPos, setPreviewPos] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = usePlayer(url);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // 볼륨값이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('videoPlayerVolume', volume.toString());
  }, [volume]);

  // 초기 볼륨값 설정
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [videoRef, volume]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleProgress = () => {
      setBufferedSegments(video.buffered);
    };

    const handleDurationChange = () => {
      const newDuration = video.duration;
      setDuration(newDuration);
      onDuration?.(newDuration);
      setDvrEnabled(isLive && newDuration > 60);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('progress', handleProgress);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [isLive, onDuration, videoRef]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      const target = e.target as HTMLElement;
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;

      if (!isInput) {
        if (e.code === 'Space') {
          e.preventDefault();
          handlePlayPause();
        } else if (e.code === 'KeyF') {
          e.preventDefault();
          toggleFullscreen();
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          seekBackward(5);
        } else if (e.code === 'ArrowRight') {
          e.preventDefault();
          seekForward(5);
        } else if (e.code === 'ArrowUp') {
          e.preventDefault();
          adjustVolume(0.1);
        } else if (e.code === 'ArrowDown') {
          e.preventDefault();
          adjustVolume(-0.1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, volume, videoRef]);

  const adjustVolume = (delta: number) => {
    if (!videoRef.current) return;

    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  function handlePlayPause() {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error('재생 시도 중 오류 발생', error);
      });
    }
  }

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`전체화면 모드 활성화 중 오류 발생: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.volume = volume;
    } else {
      videoRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const newTime = video.currentTime;
    setCurrentTime(newTime);
    onTimeUpdate?.(newTime);

    if (isLive) {
      setIsAtLiveEdge(video.duration - newTime < 1);
    }
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const time = pos * duration;

    setPreviewTime(time);
    setPreviewPos(pos * 100);
  };

  const calculateProgress = (time: number) => {
    if (duration === 0) return 0;
    return (time / duration) * 100;
  };

  const seek = (clientX: number) => {
    if (!progressContainerRef.current || !videoRef.current) return;

    const rect = progressContainerRef.current.getBoundingClientRect();
    let pos = (clientX - rect.left) / rect.width;
    pos = Math.max(0, Math.min(1, pos));
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    onTimeUpdate?.(newTime);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seek(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    seek(e.clientX);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const playerContainer = playerContainerRef.current;
    if (!playerContainer) return;

    const handleMouseEnter = () => {
      setIsControlsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsControlsVisible(false);
    };

    playerContainer.addEventListener('mouseenter', handleMouseEnter);
    playerContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      playerContainer.removeEventListener('mouseenter', handleMouseEnter);
      playerContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handlePlayerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.controls-overlay') || (e.target as HTMLElement).closest('.control-group')) {
      return;
    }
    handlePlayPause();
  };

  const seekBackward = (seconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.max(currentTime - seconds, 0);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const seekForward = (seconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.min(currentTime + seconds, duration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <PlayerContainer ref={playerContainerRef} $isControlsVisible={isControlsVisible} onClick={handlePlayerClick}>
      <Video ref={videoRef} onTimeUpdate={handleTimeUpdate} />

      <ControlsOverlay $isVisible={isControlsVisible} className="controls-overlay">
        <ProgressContainer
          ref={progressContainerRef}
          onClick={(e) => seek(e.clientX)}
          onMouseMove={handleProgressHover}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setPreviewTime(null)}
          $isLive={isLive}
          $dvr={dvrEnabled}
        >
          {bufferedSegments &&
            !isLive &&
            Array.from({ length: bufferedSegments.length }).map((_, i) => (
              <BufferedProgress
                key={i}
                style={{
                  left: `${(bufferedSegments.start(i) / duration) * 100}%`,
                  width: `${((bufferedSegments.end(i) - bufferedSegments.start(i)) / duration) * 100}%`
                }}
              />
            ))}

          <Progress $progress={calculateProgress(currentTime)} $isLive={isLive} />
          <ProgressHandle style={{ left: `${calculateProgress(currentTime)}%` }} />

          {previewTime !== null && !isLive && (
            <PreviewThumbnail $pos={previewPos}>
              <PreviewTime>{formatTime(previewTime)}</PreviewTime>
            </PreviewThumbnail>
          )}

          {isLive && <LiveProgress $isLive={isAtLiveEdge} />}
        </ProgressContainer>

        <ControlsRow>
          <ControlGroup className="control-group">
            <Button onClick={handlePlayPause}>{isPlaying ? <Pause size={24} /> : <Play size={24} />}</Button>

            <VolumeControl>
              <Button onClick={handleMuteToggle}>{isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}</Button>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                $volume={isMuted ? 0 : volume}
              />
            </VolumeControl>

            <TimeDisplay>
              {formatTime(currentTime)}
              {!isLive && ` / ${formatTime(duration)}`}
            </TimeDisplay>
          </ControlGroup>

          <ControlGroup className="control-group">
            <MaximizeButton onClick={toggleFullscreen}>
              <Maximize size={24} />
            </MaximizeButton>
          </ControlGroup>
        </ControlsRow>
      </ControlsOverlay>
    </PlayerContainer>
  );
};

export default VideoPlayer;

const PlayerContainer = styled.div<StyledProps>`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  overflow: hidden;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 30%;
    pointer-events: none;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &::before {
    top: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);
    opacity: ${(props) => (props.$isControlsVisible ? 1 : 0)};
  }

  &::after {
    bottom: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent);
    opacity: ${(props) => (props.$isControlsVisible ? 1 : 0)};
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
`;

const ControlsOverlay = styled.div<StyledProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 2;
`;

const ProgressContainer = styled.div<StyledProps>`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  margin-bottom: 1rem;
  position: relative;
  transition: height 0.2s ease;

  &:hover {
    height: 8px;
  }
`;

const Progress = styled.div<StyledProps>`
  position: absolute;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 0, 0.85) 50%, rgba(255, 0, 0, 1) 100%);
  transition: width 0.1s linear;
  width: ${(props) => props.$progress}%;
  left: 0;
`;

const LiveProgress = styled.div<StyledProps>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => (props.$isLive ? '4px' : '0')};
  height: 100%;
  background-color: #ff0000;
  box-shadow: ${(props) => (props.$isLive ? '0 0 6px #ff0000' : 'none')};
  transition: width 0.2s ease;
`;

const BufferedProgress = styled.div<StyledProps>`
  position: absolute;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  transition: width 0.2s ease;
`;

const ProgressHandle = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #ff0000;
  border: 2px solid #ff0000;
  border-radius: 50%;
  cursor: pointer;
  z-index: 4;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: rgba(255, 0, 0, 0.8);
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const PreviewThumbnail = styled.div<{ $pos: number }>`
  position: absolute;
  bottom: 100%;
  left: ${(props) => props.$pos}%;
  transform: translateX(-50%);
  background: #000;
  padding: 2px;
  border-radius: 4px;
  margin-bottom: 8px;
  z-index: 3;
`;

const PreviewTime = styled.div`
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// 커스텀 볼륨 슬라이더 스타일링
const VolumeSlider = styled.input<{ $volume: number }>`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: linear-gradient(
    to right,
    white ${(props) => props.$volume * 100}%,
    rgba(255, 255, 255, 0.2) ${(props) => props.$volume * 100}%
  );
  border-radius: 2px;
  transition: opacity 0.2s;

  /* 웹킷 브라우저용 슬라이더 트랙 */
  &::-webkit-slider-runnable-track {
    height: 4px;
    background: transparent;
    border-radius: 2px;
    border: none;
  }

  /* 웹킷 브라우저용 슬라이더 썸 */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    margin-top: -4px;
    border: 2px solid white;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }

  /* 모질라 브라우저용 슬라이더 트랙 */
  &::-moz-range-track {
    height: 4px;
    background: transparent;
    border-radius: 2px;
    border: none;
  }

  /* 모질라 브라우저용 슬라이더 썸 */
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: 2px solid white;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }

  /* 포커스 시 트랙 배경 유지 */
  &:focus::-webkit-slider-runnable-track,
  &:focus::-moz-range-track {
    background: transparent;
  }
`;

const TimeDisplay = styled.span`
  font-size: 16px;
  color: white;
`;
const MaximizeButton = styled(Button)`
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.95);
  }
`;
