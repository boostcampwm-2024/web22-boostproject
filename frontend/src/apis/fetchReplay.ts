import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { ClientReplayResponse } from '@type/replay';

export const fetchReplay = async ({ videoId }: { videoId: string }): Promise<ClientReplayResponse> => {
  try {
    const response: AxiosResponse = await fetchInstance().get('/replay/video', {
      params: {
        videoId
      }
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
