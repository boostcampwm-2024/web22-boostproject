import { AxiosResponse } from 'axios';
import { fetchInstance } from '.';

export type ChatRuleResponse = {
  notice: string;
  channelName: string;
};

export const fetchChatRule = async ({ sessionKey }: { sessionKey: string }): Promise<ChatRuleResponse> => {
  const response: AxiosResponse<ChatRuleResponse> = await fetchInstance().get('/streams/notice', {
    params: {
      sessionKey
    }
  });

  return response.data;
};
