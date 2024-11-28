import { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { MainLive } from '@type/live';

interface MiniPlayerItemProps {
  item: MainLive;
  index: number;
  onMouseEnter: (index: number) => void;
  isSelected: boolean;
}

const MiniPlayerItem = memo<MiniPlayerItemProps>(
  ({ item, onMouseEnter, index, isSelected }) => {
    const handleMouseEnter = useCallback(() => {
      onMouseEnter(index);
    }, [onMouseEnter, index]);

    const thumbnailUrl = useMemo(
      () => item.defaultThumbnailImageUrl ?? item.liveImageUrl,
      [item.defaultThumbnailImageUrl, item.liveImageUrl]
    );

    return (
      <MiniPlayerItemStyled role="none" onMouseEnter={handleMouseEnter}>
        <Thumbnail role="tab" aria-selected={isSelected}>
          <ThumbnailWrapper $backgroundUrl={thumbnailUrl} />
        </Thumbnail>
        <TooltipContent>
          <Title>{item.liveTitle}</Title>
          <StreamerName>{item.channel.channelName}</StreamerName>
        </TooltipContent>
      </MiniPlayerItemStyled>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.item.liveId === nextProps.item.liveId &&
      prevProps.index === nextProps.index
    );
  }
);

MiniPlayerItem.displayName = 'MiniPlayerItem';

export default MiniPlayerItem;

const TooltipContent = styled.div`
  display: none;
  max-width: 200px;
  position: absolute;
  bottom: 106%;
  left: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 8px;
  white-space: nowrap;
  z-index: 4;
`;

const MiniPlayerItemStyled = styled.div`
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

const ThumbnailWrapper = styled.div<{ $backgroundUrl: string }>`
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background-position: center;
  background-size: cover;
  transition: background-image 0.3s ease;
  background-image: url(${(props) => props.$backgroundUrl});
`;

const Title = styled.strong`
  display: block;
  color: white;
  font-size: 14px;
  margin-bottom: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StreamerName = styled.span`
  color: #ccc;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
`;
