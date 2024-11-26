import { useEffect, useState } from 'react';
import { updateElapsedTime } from '@utils/updateElapsedTime';

interface ElapsedTimeProps {
  startDate: string;
}

const ElapsedTime = ({ startDate }: ElapsedTimeProps) => {
  const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');
  const startDateTime = new Date(startDate).getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedTime = updateElapsedTime({ startDateTime, now });
      setElapsedTime(updatedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return <span>{elapsedTime} 스트리밍 중</span>;
};

export default ElapsedTime;