const STORAGE_KEYS = {
  STREAM: 'STREAM_KEY',
  SESSION: 'SESSION_KEY'
};

export const getStreamKey = () => {
  const streamKey = localStorage.getItem(STORAGE_KEYS.STREAM);

  return streamKey ?? '';
};

export const setStreamKey = (key: string) => {
  if (!key.trim()) {
    localStorage.removeItem(STORAGE_KEYS.STREAM);
    return;
  }

  localStorage.setItem(STORAGE_KEYS.STREAM, key);
};

export const getSessionKey = (): string => {
  const sessionKey = localStorage.getItem(STORAGE_KEYS.SESSION);

  return sessionKey ?? '';
};

export const setSessionKey = (key: string): void => {
  if (!key.trim()) {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    return;
  }
  
  localStorage.setItem(STORAGE_KEYS.SESSION, key);
};
