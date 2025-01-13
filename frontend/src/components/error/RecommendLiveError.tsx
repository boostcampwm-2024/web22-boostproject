import styled from 'styled-components';

import { RECOMMEND_LIVE } from '@constants/recommendLive';

interface RecommendLiveErrorProps {
  error: Error;
}

const RecommendLiveError = ({ error }: RecommendLiveErrorProps) => {
  return (
    <RecommendContainer $height={RECOMMEND_LIVE.HEIGHT}>
      <ErrorComment>에러가 발생했습니다: {error.message}</ErrorComment>
      <RefetchButton onClick={() => window.location.reload()}>새로고침</RefetchButton>
    </RecommendContainer>
  );
};

export default RecommendLiveError;

const RecommendContainer = styled.div<{ $height: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height};
  background-color: ${({ theme }) => theme.tokenColors['surface-default']};
`;

const ErrorComment = styled.p`
  margin-bottom: 20px;
  ${({ theme }) => theme.tokenTypographys['display-bold14']}
  color: ${({ theme }) => theme.tokenColors['text-strong']};
`;

const RefetchButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  ${({ theme }) => theme.tokenTypographys['display-bold16']}
  color: ${({ theme }) => theme.colorMap.gray.black};
  background-color: ${({ theme }) => theme.tokenColors['brand-default']};
  cursor: pointer;
`;
