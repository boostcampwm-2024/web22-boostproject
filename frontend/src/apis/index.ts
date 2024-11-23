import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import axios from 'axios';

export const BASE_URL = 'http://test.liboo.kr';

export const initFetchInstance = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      Accept: 'application/json'
    }
  });

export const fetchInstance = () => initFetchInstance(BASE_URL);

const defaultOptions: DefaultOptions = {
  queries: {
    retry: 3,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true
  }
};

export const queryClient = new QueryClient({
  defaultOptions
});
