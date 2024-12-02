import { useQuery } from '@tanstack/react-query';

import { checkLiveExist } from '@apis/checkLiveExist';
import { LiveExistenceResponse } from '@type/live';

export const useCheckLiveExist = ({ liveId }: { liveId: string }) => {
  return useQuery<LiveExistenceResponse, Error>({
    queryKey: ['checkLiveExist'],
    queryFn: () => checkLiveExist({ liveId }),
    refetchOnWindowFocus: false,
    initialData: { existed: true }
  });
};
