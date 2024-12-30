import { useQuery } from '@tanstack/react-query';

import { fetchLive } from '@apis/fetchLive';
import { ClientLive } from '@type/live';

export const useClientLive = ({ liveId }: { liveId: string }) => {
  return useQuery<ClientLive, Error>({
    queryKey: ['clientLive'],
    queryFn: () => fetchLive({ liveId: liveId }),
    refetchOnWindowFocus: false
  });
};
