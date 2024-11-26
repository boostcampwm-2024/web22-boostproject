import { useQuery } from '@tanstack/react-query';

import { fetchRecentLive } from '@apis/fetchRecentLive';
import { RecentLiveResponse } from '@type/live';

export const useRecentLive = () => {
  return useQuery<RecentLiveResponse, Error>({
    queryKey: ['recentLive'],
    queryFn: fetchRecentLive,
    refetchOnWindowFocus: false
  });
};
