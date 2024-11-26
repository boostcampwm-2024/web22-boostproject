export const formatTimeDifference = ({ startDate, now }: { startDate: Date; now: Date }) => {
  const diffInMilliseconds = now.getTime() - startDate.getTime();

  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else {
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();
    return `${month}.${day}`;
  }
};
