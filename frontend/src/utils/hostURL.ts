import { getSessionKey } from './streamKey';

export function getHostURL() {
  const sessionKey = getSessionKey();

  return `https://kr.object.ncloudstorage.com/web22/live/${sessionKey}/index.m3u8`;
}
