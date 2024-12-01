import { useQuery } from '@tanstack/react-query';

import { checkReplayExist } from '@apis/checkReplayExist';
import { ReplayExistenceResponse } from '@type/replay';

export const useCheckReplayExist = ({ videoId }: { videoId: string }) => {
  return useQuery<ReplayExistenceResponse, Error>({
    queryKey: ['checkReplayExist'],
    queryFn: () => checkReplayExist({ videoId }),
    refetchOnWindowFocus: false,
    initialData: { existed: true }
  });
};
