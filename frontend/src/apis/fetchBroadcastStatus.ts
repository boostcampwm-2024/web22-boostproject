import { fetchInstance } from '.';

export type BroadcastStatusResponse = {
  state: boolean;
};

export const fetchBroadcastStatus = async (sessionKey: string): Promise<BroadcastStatusResponse> => {
  const response = await fetchInstance().get<BroadcastStatusResponse>('/host/state', {
    params: {
      sessionKey
    }
  });

  return {
    state: response.data.state
  };
};
