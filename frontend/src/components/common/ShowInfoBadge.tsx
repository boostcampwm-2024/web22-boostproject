import { styled } from 'styled-components';

interface ShowInfoBadgeProps {
  badgeType: 'category' | 'tag';
  text: string;
  onClick?: () => void;
}

const ShowInfoBadge = ({ text, badgeType, onClick }: ShowInfoBadgeProps) => {
  const backgroundColor = badgeType === 'category' ? 'surface-alt' : 'surface-default';

  return (
    <ShowInfoBadgeContainer $backgroundColor={backgroundColor} onClick={onClick}>
      {text}
    </ShowInfoBadgeContainer>
  );
};

export default ShowInfoBadge;

const ShowInfoBadgeContainer = styled.span<{ $backgroundColor: string }>`
  box-sizing: border-box;
  padding: 3px 6px;
  border: 1px solid ${({ theme }) => theme.tokenColors['surface-alt']};
  border-radius: 4px;
  color: ${({ theme }) => theme.tokenColors['text-default']};
  ${({ theme }) => theme.tokenTypographys['display-medium12']}
  background-color: ${({ theme, $backgroundColor }) => theme.tokenColors[$backgroundColor] || 'transparent'};
  cursor: pointer;
`;
