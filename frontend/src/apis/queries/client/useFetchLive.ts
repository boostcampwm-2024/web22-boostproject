import { useQuery } from '@tanstack/react-query';
import { fetchLive } from '@apis/fetchLive';
import { ClientLive, ClientLiveResponse } from '@type/live';

export const useClientLive = ({ liveId }: { liveId: string }) => {
  return useQuery<ClientLiveResponse, Error>({
    queryKey: ['clientLive'],
    queryFn: () => fetchLive({ liveId }),
    refetchOnWindowFocus: false,
    initialData: { info: {} as ClientLive },
    throwOnError: true,
    retry: 0,
  });
};
