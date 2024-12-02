import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { ClientLiveResponse } from '@type/live';

export const fetchLive = async ({ liveId }: { liveId: string }): Promise<ClientLiveResponse> => {
  try {
    const response: AxiosResponse = await fetchInstance().get('/streams/live', {
      params: { liveId }
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      console.log('error', error);
      throw error;
    }
    throw error;
  }
};
