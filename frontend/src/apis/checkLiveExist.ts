import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { LiveExistenceResponse } from '@type/live';

export const checkLiveExist = async ({ liveId }: { liveId: string }): Promise<LiveExistenceResponse> => {
  const response: AxiosResponse<LiveExistenceResponse> = await fetchInstance().get('/streams/existence', {
    params: {
      sessionKey: liveId
    }
  });

  return response.data;
};
