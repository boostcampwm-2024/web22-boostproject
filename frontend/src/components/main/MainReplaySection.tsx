import { useState } from 'react';
import styled from 'styled-components';

import ReplayVideoCard from './ReplayVideoCard';
import LoadMoreDivider from './LoadMoreDivider';
import { useRecentReplay } from '@queries/main/useFetchRecentReplay';
import { VIDEO_VIEW } from '@constants/videoView';

interface MainReplaySectionProps {
  title: string;
}

const MainReplaySection = ({ title }: MainReplaySectionProps) => {
  const [textStatus, setTextStatus] = useState(VIDEO_VIEW.MORE_VIEW);

  const { data: replayData } = useRecentReplay();

  const { info, appendInfo } = replayData;
  const displayedData = textStatus === VIDEO_VIEW.FOLD ? [...info, ...appendInfo] : info;

  const handleTextChange = () => {
    setTextStatus(textStatus === VIDEO_VIEW.MORE_VIEW ? VIDEO_VIEW.FOLD : VIDEO_VIEW.MORE_VIEW);
  };

  return (
    <MainSectionContainer>
      <MainSectionHeader>
        <p className="live_section_title">{title}</p>
        <button className="live_section_button">전체보기</button>
      </MainSectionHeader>

      <MainSectionContentList>
        {displayedData.map((video) => (
          <ReplayVideoCard key={video.videoNo} videoData={video} />
        ))}
      </MainSectionContentList>

      <LoadMoreDivider text={textStatus} onClick={handleTextChange} />
    </MainSectionContainer>
  );
};

export default MainReplaySection;

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
  .live_section_button {
    ${({ theme }) => theme.tokenTypographys['display-bold14']}
    color: ${({ theme }) => theme.tokenColors['text-default']};
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
