import { useEffect, useRef } from 'react';
import { updateElapsedTime } from '@utils/updateElapsedTime';

interface ElapsedTimeProps {
  startDate: string;
}

const ElapsedTime = ({ startDate }: ElapsedTimeProps) => {
  const elapsedTimeRef = useRef<string>('00:00:00');
  const startDateTime = new Date(startDate).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedTime = updateElapsedTime({ startDateTime, now });

      if (elapsedTimeRef.current !== updatedTime) {
        elapsedTimeRef.current = updatedTime;
        document.getElementById('elapsed-time')!.innerText = `${updatedTime} 스트리밍 중`;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return <span id="elapsed-time">{elapsedTimeRef.current} 스트리밍 중</span>;
};

export default ElapsedTime;
