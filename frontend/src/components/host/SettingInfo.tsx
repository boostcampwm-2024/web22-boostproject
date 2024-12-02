import styled from 'styled-components';
import OBSIcon from '@assets/img_studio_obs.png';
import DownloadIcon from '@assets/download.svg';
import { getStoredId } from '@utils/id';
import useFetchStreamKey from '@queries/host/useFetchStreamKey';
import { useEffect } from 'react';
import { setSessionKey, setStreamKey } from '@utils/streamKey';

interface SettingInfoProps {
  closeModal: () => void;
}

export default function SettingInfo({ closeModal }: SettingInfoProps) {
  const userId = getStoredId();
  const { mutate: fetchKey, data } = useFetchStreamKey({
    onSuccess: ({ streamKey, sessionKey }) => {
      setStreamKey(streamKey);
      setSessionKey(sessionKey);
    }
  });

  useEffect(() => {
    fetchKey(userId);
  }, [fetchKey, userId]);

  return (
    <PopupOverlay onClick={closeModal}>
      <PopupContainer
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <PopupTitle id="popup-title">스트리밍 설정 안내</PopupTitle>
          <CloseButton onClick={closeModal} aria-label="팝업 닫기">
            <span className="blind">팝업 닫기</span>
          </CloseButton>
        </Header>
        <PopupContent id="popup-description">
          <PopupInner>
            <ol>
              <StepItem>
                <StepTitle>1. 스트리밍 소프트웨어를 다운로드하세요.</StepTitle>
                <DownloadLink href="https://obsproject.com" target="_blank" rel="noreferrer">
                  <IconWrapper>
                    <img src={OBSIcon} alt="Open Broadcaster Software" />
                    <StyledDownloadIcon />
                  </IconWrapper>
                  <DownloadName>Open Broadcaster Software</DownloadName>
                </DownloadLink>
              </StepItem>
              <StepItem>
                <StepTitle>2. 스트림 키를 소프트웨어에 붙여 넣어주세요.</StepTitle>
                <StreamSettings>
                  <SettingRow>
                    <Label htmlFor="streamUrl">스트림 URL</Label>
                    <ValueWithButton>
                      <StreamURL>rtmp://test.liboo.kr:1935/live</StreamURL>
                      <CopyButton onClick={() => navigator.clipboard.writeText('rtmp://test.liboo.kr:1935/live')}>
                        복사
                      </CopyButton>
                    </ValueWithButton>
                  </SettingRow>
                  <SettingRow>
                    <Label htmlFor="streamKey">스트림 키</Label>
                    <ValueWithButton>
                      <StreamKeyInput type="password" readOnly value={data?.streamKey ?? ''} />
                      <CopyButton onClick={() => data?.streamKey && navigator.clipboard.writeText(data?.streamKey)}>
                        복사
                      </CopyButton>
                    </ValueWithButton>
                  </SettingRow>
                </StreamSettings>
              </StepItem>
              <StepItem>
                <StepTitle>3. 스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.</StepTitle>
              </StepItem>
            </ol>
          </PopupInner>
        </PopupContent>
        <PopupFooter>
          <ConfirmButton onClick={closeModal}>확인</ConfirmButton>
        </PopupFooter>
      </PopupContainer>
    </PopupOverlay>
  );
}

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  max-width: 600px;
  width: 90%;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 769px) {
    width: 600px;
  }
`;

const Header = styled.div`
  position: relative;
  text-align: center;
  border-bottom: 1px solid rgb(235, 237, 243);
  padding: 22px 0;
`;

const PopupTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px 20px;
  background: none;
  border: none;
  cursor: pointer;

  .blind {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  svg {
    width: 30px;
    height: 30px;
  }
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopupInner = styled.div`
  padding: 25px 30px 10px;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const StepItem = styled.li`
  margin-bottom: 15px;
`;

const StepTitle = styled.p`
  font-weight: 700;
  margin-bottom: 10px;
`;

const DownloadLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 5px;
  padding: 20px;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  margin-right: 20px;

  img {
    width: 70px;
    height: 70px;
    border-radius: 5px;
    display: block;
  }
`;

const StyledDownloadIcon = styled(DownloadIcon)`
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  fill: #2e3033;
`;

const DownloadName = styled.span`
  color: rgb(105, 113, 131);
  font-size: 13px;
  margin-top: 10px;
`;

const StreamSettings = styled.div`
  margin-top: 20px;
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.label`
  color: rgb(82, 86, 98);
  font-size: 14px;
  width: 100px;
  margin-right: 7px;
`;

const ValueWithButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-grow: 1;
`;

const StreamURL = styled.p`
  word-break: break-all;
  flex-grow: 1;
`;

const StreamKeyInput = styled.input`
  width: 70%;
  height: 100%;
  padding: 8px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
`;

const CopyButton = styled.button`
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const PopupFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const ConfirmButton = styled.button`
  font-size: 14px;
  line-height: 22px;
  background-color: rgb(78, 65, 219);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 7px;
  cursor: pointer;
  padding: 16px 25px;
  width: 160px;

  &:hover {
    background-color: #4e41dbcc;
  }
`;
