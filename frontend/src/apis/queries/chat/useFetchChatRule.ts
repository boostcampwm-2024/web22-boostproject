import { useQuery } from '@tanstack/react-query';
import { ChatRuleResponse, fetchChatRule } from '@apis/fetchChatRule';

export const useFetchChatRule = ({ sessionKey }: { sessionKey: string }) => {
  return useQuery<ChatRuleResponse, Error>({
    queryKey: ['chatRule'],
    queryFn: () => fetchChatRule({ sessionKey }),
    refetchOnWindowFocus: false
  });
};
