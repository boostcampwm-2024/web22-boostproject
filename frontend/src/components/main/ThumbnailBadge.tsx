import { styled } from 'styled-components';

interface ThumbnailBadgeProps {
  text: string;
  backgroundColor: string;
  size?: 'small' | 'large';
}

const ThumbnailBadge = ({ text, backgroundColor, size = 'small' }: ThumbnailBadgeProps) => {
  return (
    <ThumbnailBadgeContainer $backgroundColor={backgroundColor} $size={size}>
      {text}
    </ThumbnailBadgeContainer>
  );
};

/** "LIVE" 뱃지 */
const LiveBadge = () => <ThumbnailBadge text="LIVE" backgroundColor="red-default" size="small" />;
const LiveBadgeLarge = () => <ThumbnailBadge text="LIVE" backgroundColor="red-default" size="large" />;

/** "다시보기" 뱃지 */
const ReplayBadge = () => <ThumbnailBadge text="다시보기" backgroundColor="purple-default" size="small" />;

/** 라이브 조회수 뱃지 */
const LiveViewCountBadge = ({ count }: { count: number }) => (
  <ThumbnailBadge text={`${count}명`} backgroundColor="rgba(20, 21, 23, 0.9)" size="small" />
);

/** 다시보기 조회수 뱃지 */
const ReplayViewCountBadge = ({ count }: { count: number }) => (
  <ThumbnailBadge text={`${count}회 시청된 라이브`} backgroundColor="rgba(20, 21, 23, 0.9)" size="small" />
);

export { ThumbnailBadge, LiveBadge, LiveBadgeLarge, ReplayBadge, LiveViewCountBadge, ReplayViewCountBadge };

const ThumbnailBadgeContainer = styled.span<{ $backgroundColor: string; $size: 'small' | 'large' }>`
  padding: ${({ $size }) => ($size === 'large' ? '6px 12px' : '6px 8px')};
  ${({ theme, $size }) => theme.tokenTypographys[$size === 'large' ? 'display-bold16' : 'display-bold12']}
  border-radius: 4px;
  color: ${({ theme }) => theme.tokenColors['color-white']};

  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor.startsWith('#') || $backgroundColor.startsWith('rgb')
      ? $backgroundColor
      : theme.tokenColors[$backgroundColor] || theme.tokenColors['gray-default']};
`;
