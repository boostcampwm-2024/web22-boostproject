import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { LiveBadgeLarge } from './ThumbnailBadge';

interface AnimatedLiveHeaderProps {
  concurrentUserCount: number;
  liveTitle: string;
}

const AnimatedLiveHeader = ({ concurrentUserCount, liveTitle }: AnimatedLiveHeaderProps) => {
  return (
    <RecommendLiveHeader>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${concurrentUserCount}-${liveTitle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="recommend_live_status"
        >
          <LiveBadgeLarge />
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {concurrentUserCount}명 시청
          </motion.span>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={liveTitle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="recommend_live_title"
        >
          {liveTitle}
        </motion.p>
      </AnimatePresence>
    </RecommendLiveHeader>
  );
};

export default AnimatedLiveHeader;

const RecommendLiveHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .recommend_live_status {
    display: flex;
    align-items: center;
    gap: 10px;
    ${({ theme }) => theme.tokenTypographys['display-bold16']}
    color: ${({ theme }) => theme.tokenColors['red-default']};
  }

  .recommend_live_title {
    ${({ theme }) => theme.tokenTypographys['display-bold24']}
    color: ${({ theme }) => theme.tokenColors['color-white']};
  }
`;
