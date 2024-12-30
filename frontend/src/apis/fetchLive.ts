import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { ClientLive } from '@type/live';

type ClientLiveResponse = {
  info: ClientLive;
};

export const fetchLive = async ({ liveId }: { liveId: string }): Promise<ClientLive> => {
  const response: AxiosResponse<ClientLiveResponse> = await fetchInstance().get('/streams/live', {
    params: {
      liveId
    }
  });

  return response.data.info;
};
