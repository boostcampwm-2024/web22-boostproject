import { useQuery } from '@tanstack/react-query';

import { fetchReplay } from '@apis/fetchReplay';
import { ReplayStream } from '@type/replay';

export const useClientReplay = ({ videoId }: { videoId: string }) => {
  return useQuery<ReplayStream, Error>({
    queryKey: ['clientReplay'],
    queryFn: () => fetchReplay({ videoId }),
    refetchOnWindowFocus: false
  });
};
