import { KEYWORDS } from '@constants/bannerKeywords';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface GradientTextProps {
  gradient: string;
}

const ServiceBanner = () => {
  return (
    <BannerContainer>
      <ContentWrapper>
        <AnimatedContainer>
          <TextContainer
            initial={{ x: '0%' }}
            animate={{ x: `-${100 / 3}%` }}
            transition={{
              x: {
                duration: 60,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop'
              }
            }}
          >
            {[...Array(4)].map((_, setIndex) =>
              KEYWORDS.map(({ text, gradient }, index) => (
                <GradientText key={`set-${setIndex}-keyword-${index}`} gradient={gradient}>
                  {text}
                </GradientText>
              ))
            )}
          </TextContainer>
        </AnimatedContainer>
      </ContentWrapper>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: relative;
  height: 5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #1a1a1a;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const AnimatedContainer = styled.div`
  position: absolute;
  display: flex;
  flex: 1;
  width: 100%;
`;

const TextContainer = styled(motion.div)`
  display: flex;
  white-space: nowrap;
`;

const GradientText = styled.div<GradientTextProps>`
  font-family: 'NanumSquare', sans-serif;
  font-weight: 800;
  flex-shrink: 0;
  font-size: 2rem;
  margin-right: 3rem;
  background-image: ${({ gradient }) => gradient};
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
`;

export default ServiceBanner;
