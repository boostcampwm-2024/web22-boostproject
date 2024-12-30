import { BASE_URL, RTMP_HTTP_PORT } from '@apis/index';
import { getStreamKey } from './streamKey';

export function getHostURL() {
  const streamKey = getStreamKey();

  return `${BASE_URL}:${RTMP_HTTP_PORT}/live/${streamKey}/index.m3u8`;
}
