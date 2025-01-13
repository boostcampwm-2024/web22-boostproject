import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';
import { HostInfo } from '@type/hostInfo';

export const updateHost = async (hostInfo: HostInfo): Promise<HostInfo> => {
  const response: AxiosResponse<HostInfo> = await fetchInstance().post('/host/update', hostInfo);

  return response.data;
};
