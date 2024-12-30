import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchMainLive } from '@apis/fetchMainLive';
import { MainLive } from '@type/live';

export const useMainLive = () => {
  return useSuspenseQuery<MainLive[], Error>({
    queryKey: ['mainLive'],
    queryFn: fetchMainLive,
    refetchOnWindowFocus: false,
  });
};
