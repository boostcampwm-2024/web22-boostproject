export const updateElapsedTime = ({ startDateTime, now }: { startDateTime: number; now: number }) => {
  const diffInSeconds = Math.floor((now - startDateTime) / 1000);
  const hours = String(Math.floor(diffInSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((diffInSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(diffInSeconds % 60).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
