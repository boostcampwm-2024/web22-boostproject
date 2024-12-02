import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { ChannelInfo } from '@type/channel';

interface AnimatedProfileSectionProps {
  channel: ChannelInfo;
  category: string;
  profileImage: string;
}
const AnimatedProfileSection = ({ channel, category, profileImage }: AnimatedProfileSectionProps) => {
  return (
    <Flex>
      <AnimatePresence mode="wait">
        <motion.div
          key={channel.channelName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <RecommendLiveProfile>
            <motion.img
              src={profileImage}
              alt="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          </RecommendLiveProfile>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={channel.channelName}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <RecommendLiveArea>
            <span className="video_card_name">{channel.channelName}</span>
            <span className="video_card_category">{category}</span>
          </RecommendLiveArea>
        </motion.div>
      </AnimatePresence>
    </Flex>
  );
};

export default AnimatedProfileSection;

const RecommendLiveProfile = styled.div`
  margin-right: 10px;
  background: ${({ theme }) => theme.tokenColors['surface-alt']} no-repeat 50% / cover;
  border: 2px solid ${({ theme }) => theme.tokenColors['brand-default']};
  border-radius: 50%;
  display: block;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  width: 70px;
  height: 70px;

  &:hover {
    outline: 4px solid ${({ theme }) => theme.tokenColors['brand-default']};
    outline-offset: -2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RecommendLiveArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 192px;
  gap: 5px;
  .video_card_name {
    ${({ theme }) => theme.tokenTypographys['display-bold20']}
    color: ${({ theme }) => theme.tokenColors['text-strong']};
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .video_card_category {
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['brand-default']};
    margin-bottom: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Flex = styled.div`
  display: flex;
`;
