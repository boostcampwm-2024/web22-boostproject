export const calculateProgress = (currentTime: number, duration: number): number => {
  if (duration === 0) return 0;
  return (currentTime / duration) * 100;
};
