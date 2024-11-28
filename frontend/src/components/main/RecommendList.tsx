import { forwardRef, memo, useCallback } from 'react';
import styled from 'styled-components';
import { MainLive } from '@type/live';
import MiniPlayerItem from './MiniPlayerItem';

interface RecommendListProps {
  mainLiveData: Array<MainLive>;
  onSelect: (index: number) => void;
  currentLiveId: string;
}

const RecommendList = forwardRef<HTMLDivElement, RecommendListProps>(
  ({ mainLiveData, onSelect, currentLiveId }, ref) => {
    const handleMouseEnter = useCallback(
      (index: number) => {
        onSelect(index);
      },
      [onSelect]
    );

    return (
      <Container ref={ref} role="tablist">
        {mainLiveData.map((item, index) => (
          <MiniPlayerItem
            key={item.liveId}
            item={item}
            index={index}
            onMouseEnter={handleMouseEnter}
            isSelected={item.liveId === currentLiveId}
          />
        ))}
      </Container>
    );
  }
);

RecommendList.displayName = 'RecommendList';

export default memo(RecommendList);

const Container = styled.div`
  display: flex;
  gap: 4px;
  padding: 20px 0;
`;
