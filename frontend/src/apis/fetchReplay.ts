import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { ReplayStream } from '@type/replay';

type ReplayStreamResponse = {
  info: ReplayStream;
};

export const fetchReplay = async ({ videoId }: { videoId: string }): Promise<ReplayStream> => {
  const response: AxiosResponse<ReplayStreamResponse> = await fetchInstance().get('/replay/video', {
    params: {
      videoId
    }
  });

  return response.data.info;
};
