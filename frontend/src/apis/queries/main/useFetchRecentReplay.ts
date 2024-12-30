import { useQuery } from '@tanstack/react-query';

import { fetchRecentReplay } from '@apis/fetchRecentReplay';
import { RecentReplayResponse } from '@type/replay';

export const useRecentReplay = () => {
  return useQuery<RecentReplayResponse, Error>({
    queryKey: ['recentReplay'],
    queryFn: fetchRecentReplay,
    refetchOnWindowFocus: false,
    initialData: { info: [], appendInfo: [] }
  });
};
