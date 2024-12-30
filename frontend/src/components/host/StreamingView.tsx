import OfflineView from './OfflineView';
import OnlineView from './OnlineView';

interface StreamingViewProps {
  onStreaming: boolean;
  openModal: () => void;
}

export default function StreamingView({ onStreaming, openModal }: StreamingViewProps) {
  if (onStreaming) {
    return <OnlineView />;
  }

  return <OfflineView openModal={openModal} />;
}
