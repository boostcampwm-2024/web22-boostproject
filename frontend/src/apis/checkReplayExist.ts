import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { ReplayExistenceResponse } from '@type/replay';

export const checkReplayExist = async ({ videoId }: { videoId: string }): Promise<ReplayExistenceResponse> => {
  const response: AxiosResponse<ReplayExistenceResponse> = await fetchInstance().get('/replay/existence', {
    params: {
      videoId
    }
  });

  return response.data;
};
