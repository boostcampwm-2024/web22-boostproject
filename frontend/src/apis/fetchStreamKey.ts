import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';

type NanoId = string;

export type StreamKeyResponse = {
  streamKey: string;
  sessionKey: string;
};

export const fetchStreamKey = async (userId: NanoId): Promise<StreamKeyResponse> => {
  const response: AxiosResponse<StreamKeyResponse> = await fetchInstance().post('/host/key', {
    userId
  });
  return response.data;
};
