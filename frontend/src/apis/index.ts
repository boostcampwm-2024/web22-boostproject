import { QueryClient, DefaultOptions } from '@tanstack/react-query';
import axios from 'axios';

export const BASE_URL = 'https://liboo.kr';
export const RTMP_PORT = '1935';
export const RTMP_HTTP_PORT = '8000';
export const API_PORT = '3000';

export const initFetchInstance = (baseURL: string) =>
  axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      Accept: 'application/json'
    }
  });

export const fetchInstance = () => initFetchInstance(`${BASE_URL}:${API_PORT}`);
export const fetchRTMPInstance = () => initFetchInstance(`${BASE_URL}:${RTMP_HTTP_PORT}`);

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
