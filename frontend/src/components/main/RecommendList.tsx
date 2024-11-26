import { MainLive } from '@type/live';
import styled from 'styled-components';

interface RecommendListProps {
  mainLiveData: Array<MainLive>;
  onSelect: (index: number) => void;
  currentLiveId: string;
}

export default function RecommendList({ mainLiveData, onSelect, currentLiveId }: RecommendListProps) {
  const handleMouseEnter = (index: number) => {
    onSelect(index);
  };

  return (
    <Container role="tablist">
      {mainLiveData.map(({ liveId, liveTitle, channel, defaultThumbnailImageUrl, liveImageUrl }, index) => (
        <MiniPlayerItem key={liveId} role="none" onMouseEnter={() => handleMouseEnter(index)}>
          <Thumbnail role="tab" aria-selected={currentLiveId === liveId}>
            <ThumbnailWrapper
              style={{
                backgroundImage: `url(${defaultThumbnailImageUrl ?? liveImageUrl})`
              }}
            />
          </Thumbnail>
          <TooltipContent>
            <Title>{liveTitle}</Title>
            <StreamerName>{channel.channelName}</StreamerName>
          </TooltipContent>
        </MiniPlayerItem>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 20px 0;
`;

const TooltipContent = styled.div`
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 4px;
  border-radius: 4px;
  margin-bottom: 8px;
  white-space: nowrap;
  z-index: 4;
`;

const MiniPlayerItem = styled.div`
  position: relative;
  width: 110px;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center bottom;
  margin: 0 8px;

  &:hover {
    transform: scale(1.2);
    margin: 0 20px;
    z-index: 3;

    ${TooltipContent} {
      display: block;
    }
  }
`;
const Thumbnail = styled.div`
  position: relative;
  border-radius: 4px;

  &[aria-selected='true'] {
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      background: linear-gradient(90deg, #00cc99, #66ffb2);
      border-radius: 6px;
      z-index: -1;
      transition: opacity 0.3s ease;
    }
  }
`;

const ThumbnailWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background-position: center;
  background-size: cover;
  transition: background-image 0.3s ease;
`;

const Title = styled.strong`
  display: block;
  color: white;
  font-size: 14px;
  margin-bottom: 4px;
`;

const StreamerName = styled.span`
  color: #ccc;
  font-size: 12px;
`;
