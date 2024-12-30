import styled from 'styled-components';

const Footer = () => {
  const footerItem = [
    { title: '라이부 노션', link: 'https://gominzip.notion.site/TEAM-127673f3719e803faf63c70322560d3b?pvs=4' },
    { title: '라이부 깃허브', link: 'https://github.com/boostcampwm-2024/web22-LiBoo' },
    { title: '개발자에게 커피 사주기', link: '' },
    { title: '라이부 팀 소개', link: '' },
    { title: '라이부 팀 블로그', link: '' }
  ];

  return (
    <FooterContainer>
      {footerItem.map(({ title, link }, index) => (
        <a key={index} href={link} className="footer-link">
          {title}
        </a>
      ))}
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  gap: 40px;
  ${({ theme }) => theme.tokenTypographys['display-medium12']};

  .footer-link {
    color: ${({ theme }) => theme.tokenColors['text-default']};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
