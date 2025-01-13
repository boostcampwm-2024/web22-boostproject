import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  isMuted: boolean;
  volume: number;
  onMuteToggle: () => void;
  onVolumeChange: (newVolume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ isMuted, volume, onMuteToggle, onVolumeChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  // 슬라이더 드래그 상태 관리
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const slider = document.getElementById('volume-slider');
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const newVolume = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      onVolumeChange(newVolume);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onVolumeChange]);

  return (
    <VolumeContainer>
      <MuteButton onClick={onMuteToggle} aria-label={isMuted ? '음소거 해제' : '음소거'}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </MuteButton>
      <VolumeSlider
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        $volume={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        onMouseDown={() => setIsDragging(true)}
        aria-label="볼륨 조절"
      />
    </VolumeContainer>
  );
};

export default VolumeControl;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MuteButton = styled.button`
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
    margin-top: -5px;
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
