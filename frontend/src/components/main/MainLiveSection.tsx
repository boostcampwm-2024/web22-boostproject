import { useState, useEffect } from 'react';
import styled from 'styled-components';

import LiveVideoCard from './LiveVideoCard';
import LoadMoreDivider from './LoadMoreDivider';
import { useRecentLive } from '@queries/main/useFetchRecentLive';
import { VIDEO_VIEW } from '@constants/videoView';

interface MainLiveSectionProps {
  title: string;
}

const MainLiveSection = ({ title }: MainLiveSectionProps) => {
  const [textStatus, setTextStatus] = useState(VIDEO_VIEW.MORE_VIEW);
  const [renderCount, setRenderCount] = useState(10);
  const { data: liveData } = useRecentLive();

  const { info, appendInfo } = liveData;
  const allData = [...info, ...appendInfo];
  const displayedData = allData.slice(0, renderCount);

  useEffect(() => {
    const updateRenderCount = () => {
      const width = window.innerWidth;

      if (width <= 1095) setRenderCount(4);
      else if (width <= 1434) setRenderCount(6);
      else if (width <= 1770) setRenderCount(8);
      else setRenderCount(10);
    };

    updateRenderCount();

    window.addEventListener('resize', updateRenderCount);

    return () => {
      window.removeEventListener('resize', updateRenderCount);
    };
  }, []);

  const handleTextChange = () => {
    setTextStatus(textStatus === VIDEO_VIEW.MORE_VIEW ? VIDEO_VIEW.FOLD : VIDEO_VIEW.MORE_VIEW);
  };

  return (
    <MainSectionContainer>
      <MainSectionHeader>
        <p className="live_section_title">{title}</p>
      </MainSectionHeader>

      <MainSectionContentList $textStatus={textStatus}>
        {displayedData.map((video) => (
          <LiveVideoCard key={video.id} videoData={video} />
        ))}
      </MainSectionContentList>

      <LoadMoreDivider text={textStatus} onClick={handleTextChange} />
    </MainSectionContainer>
  );
};

export default MainLiveSection;

const MainSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MainSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 25px;

  .live_section_title {
    ${({ theme }) => theme.tokenTypographys['display-bold20']}
    color: ${({ theme }) => theme.tokenColors['color-white']};
  }
`;

const MainSectionContentList = styled.div<{ $textStatus: string }>`
  display: grid;
  gap: 14px;
  row-gap: 30px;
  margin-bottom: 30px;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  overflow: ${({ $textStatus }) => ($textStatus === VIDEO_VIEW.MORE_VIEW ? 'hidden' : 'visible')};

  > div {
    max-width: 100%;
  }
`;
