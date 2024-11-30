import { useState } from 'react';
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

  const { data: liveData } = useRecentLive();

  const { info, appendInfo } = liveData;
  const displayedData = textStatus === VIDEO_VIEW.FOLD ? [...info, ...appendInfo] : info;

  const handleTextChange = () => {
    setTextStatus(textStatus === VIDEO_VIEW.MORE_VIEW ? VIDEO_VIEW.FOLD : VIDEO_VIEW.MORE_VIEW);
  };

  return (
    <MainSectionContainer>
      <MainSectionHeader>
        <p className="live_section_title">{title}</p>
      </MainSectionHeader>

      <MainSectionContentList>
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

const MainSectionContentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 14px;
  row-gap: 30px;
  margin-bottom: 30px;

  > div {
    flex: 1 0 calc(20% - 14px);
    max-width: calc(20% - 10px);

    @media (max-width: 1700px) {
      flex: 1 0 calc(25% - 14px);
      max-width: calc(25% - 10px);
    }

    @media (max-width: 1500px) {
      flex: 1 0 calc(33.33% - 14px);
      max-width: calc(33.33% - 10px);
    }
  }
`;
