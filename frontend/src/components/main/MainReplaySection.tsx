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
  const displayedData = [...info, ...appendInfo];

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
`;

const MainSectionContentList = styled.div<{ $textStatus: string }>`
  display: grid;
  gap: 14px;
  row-gap: 30px;
  margin-bottom: 30px;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  overflow: ${({ $textStatus }) => ($textStatus === VIDEO_VIEW.MORE_VIEW ? 'hidden' : 'visible')};
  max-height: ${({ $textStatus }) =>
    $textStatus === VIDEO_VIEW.MORE_VIEW ? 'calc(2 * (320px + 30px) - 30px)' : 'none'};

  > div {
    max-width: 100%;
  }

  @media (max-width: 1700px) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    max-height: ${({ $textStatus }) =>
      $textStatus === VIDEO_VIEW.MORE_VIEW ? 'calc(2 * (320px + 30px) - 30px)' : 'none'};
  }

  @media (max-width: 1500px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    max-height: ${({ $textStatus }) =>
      $textStatus === VIDEO_VIEW.MORE_VIEW ? 'calc(2 * (300px + 30px) - 30px)' : 'none'};
  }
`;
