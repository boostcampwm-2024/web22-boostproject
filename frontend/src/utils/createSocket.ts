import { io, Socket } from 'socket.io-client';

export const createSocket = (
  url: string,
  eventMap: Record<string, (data: any) => void>,
  initCallback?: (socket: Socket) => void
): Socket => {
  const socket = io(url, { path: '/chat/socket.io', transports: ['websocket'] });

  socket.on('connect', () => {
    console.log('Connected:', socket.id);
  });

  for (const [event, callback] of Object.entries(eventMap)) {
    socket.on(event, callback);
  }

  if (initCallback) {
    initCallback(socket);
  }

  return socket;
};
