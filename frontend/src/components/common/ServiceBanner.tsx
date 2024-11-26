import { motion } from 'framer-motion';
import styled from 'styled-components';

const keywords = [
  { text: 'Conference', gradient: 'linear-gradient(90deg, #85ee80, #80eea8)' },
  { text: 'Development', gradient: 'linear-gradient(90deg, #80eea8, #85f3c4)' },
  { text: 'Growth', gradient: 'linear-gradient(90deg, #85f3c4, #85eff3)' },
  { text: 'Innovation', gradient: 'linear-gradient(90deg, #85eff3, #63ceee)' },
  { text: 'Technology', gradient: 'linear-gradient(90deg, #63ceee, #6388ee)' },
  { text: 'Workshop', gradient: 'linear-gradient(90deg, #6388ee, #a18ced)' },
  { text: 'Networking', gradient: 'linear-gradient(90deg, #a18ced, #ad73ec)' },
  { text: 'Leadership', gradient: 'linear-gradient(90deg, #ad73ec, #e273ec)' },
  { text: 'Creativity', gradient: 'linear-gradient(90deg, #e273ec, #fd7cb0)' },
  { text: 'Learning', gradient: 'linear-gradient(90deg, #fd7cb0, #fd7c87)' },
  { text: 'Strategy', gradient: 'linear-gradient(90deg, #fd7c87, #f8a95f)' },
  { text: 'Mentoring', gradient: 'linear-gradient(90deg, #f8a95f, #f8d563)' },
  { text: 'Agile', gradient: 'linear-gradient(90deg, #f8d563, #fcf64d)' },
  { text: 'Scaling', gradient: 'linear-gradient(90deg, #fcf64d, #9af863)' },
  { text: 'Community', gradient: 'linear-gradient(90deg, #9af863, #85ee80)' }
];

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
              keywords.map(({ text, gradient }, index) => (
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
