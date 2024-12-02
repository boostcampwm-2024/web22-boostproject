import { useQuery } from '@tanstack/react-query';

import { fetchReplay } from '@apis/fetchReplay';
import { ClientReplayResponse, ReplayStream } from '@type/replay';

export const useClientReplay = ({ videoId }: { videoId: string }) => {
  return useQuery<ClientReplayResponse, Error>({
    queryKey: ['clientReplay'],
    queryFn: () => fetchReplay({ videoId }),
    refetchOnWindowFocus: false,
    initialData: { info: {} as ReplayStream },
    throwOnError: true,
    retry: 0
  });
};
