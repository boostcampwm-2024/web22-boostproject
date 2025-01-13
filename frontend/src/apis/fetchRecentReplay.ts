import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { RecentReplayResponse } from '@type/replay';

export const fetchRecentReplay = async (): Promise<RecentReplayResponse> => {
  const response: AxiosResponse = await fetchInstance().get('/replay/latest');

  return response.data;
};
