import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { MainLive } from '@type/live';

type MainLiveResponse = {
  info: MainLive[];
};

export const fetchMainLive = async (): Promise<MainLive[]> => {
  const response: AxiosResponse<MainLiveResponse> = await fetchInstance().get('/streams/random');

  return response.data.info;
};
