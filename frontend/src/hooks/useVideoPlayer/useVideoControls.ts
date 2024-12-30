import { useEffect, useRef } from 'react';
import { ControlsAction } from '@reducers/controlsReducer';

interface UseVideoControlsProps {
  dispatch: React.Dispatch<ControlsAction>;
  playerContainerRef: React.RefObject<HTMLDivElement>;
}

const useVideoControls = ({ dispatch, playerContainerRef }: UseVideoControlsProps) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      dispatch({ type: 'SHOW_CONTROLS' });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        dispatch({ type: 'HIDE_CONTROLS' });
      }, 3000);
    };

    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dispatch, playerContainerRef]);
};

export default useVideoControls;
