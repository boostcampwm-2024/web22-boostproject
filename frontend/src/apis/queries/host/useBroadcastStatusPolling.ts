import { useQuery } from '@tanstack/react-query';
import { fetchBroadcastStatus } from '@apis/fetchBroadcastStatus';

export const useBroadcastStatusPolling = (sessionKey: string, pollingInterVal = 10000) => {
  return useQuery({
    queryKey: ['broadcastState', sessionKey],
    queryFn: () => fetchBroadcastStatus(sessionKey),
    refetchInterval: pollingInterVal,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    retry: 3,
    initialData: { state: false },
    select: (data) => data.state
  });
};
