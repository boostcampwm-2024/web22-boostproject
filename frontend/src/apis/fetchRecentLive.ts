import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { RecentLiveResponse } from '@type/live';

export const fetchRecentLive = async (): Promise<RecentLiveResponse> => {
  const response: AxiosResponse = await fetchInstance().get('/streams/latest');

  return response.data;
};
