/// <reference lib="webworker" />
import {
  CHATTING_SOCKET_DEFAULT_EVENT,
  CHATTING_SOCKET_RECEIVE_EVENT,
  CHATTING_SOCKET_SEND_EVENT
} from '../constants/chat';
import { io } from 'socket.io-client';

const TEST_SOCKET_URL = 'https://liboo.kr';
const socket = io(TEST_SOCKET_URL, { path: '/chat/socket.io', transports: ['websocket'] });

const ports: MessagePort[] = [];
const portRoomMap: Map<MessagePort, string> = new Map();
const roomMap: Map<string, MessagePort[]> = new Map();

const sharedWorker = self as unknown as SharedWorkerGlobalScope;

/** 방에 포트 추가 */
const addPortToRoom = (roomId: string, port: MessagePort) => {
  if (!roomMap.has(roomId)) {
    roomMap.set(roomId, []);
  }
  roomMap.get(roomId)?.push(port);
};

/** 방에서 포트 제거 */
const removePortFromRoom = (roomId: string, port: MessagePort) => {
  const ports = roomMap.get(roomId) || [];
  roomMap.set(
    roomId,
    ports.filter((p) => p !== port)
  );
  if (roomMap.get(roomId)?.length === 0) {
    roomMap.delete(roomId);
  }
};

/** 포트 메시지 처리 */
const handlePortMessage = (type: string, payload: any, port: MessagePort) => {
  switch (type) {
    case CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM:
      handleJoinRoom(payload, port);
      break;
    case CHATTING_SOCKET_SEND_EVENT.NORMAL:
    case CHATTING_SOCKET_SEND_EVENT.QUESTION:
    case CHATTING_SOCKET_SEND_EVENT.NOTICE:
    case CHATTING_SOCKET_SEND_EVENT.QUESTION_DONE:
      socket.emit(type, payload);
      break;
    default:
      console.warn(`Unknown message type: ${type}`);
  }
};

/** 소켓 메시지 처리 */
const handleSocketMessage = (event: string, payload: any) => {
  const { roomId } = payload;
  const targetPorts = roomMap.get(roomId) || [];
  targetPorts.forEach((port) => {
    port.postMessage({ type: event, payload });
    // port.postMessage({ type: 'logging', payload }); // 개발 디버깅용
  });
};

/** 방 입장 처리 */
const handleJoinRoom = (payload: { roomId: string; userId: string }, port: MessagePort) => {
  const { roomId, userId } = payload;

  // 포트와 roomId 연결
  portRoomMap.set(port, roomId);
  addPortToRoom(roomId, port);

  socket.emit(CHATTING_SOCKET_DEFAULT_EVENT.JOIN_ROOM, { roomId, userId });
};

/** 전역 소켓 리스너 등록 */
const initializeSocketListeners = () => {
  const socketEvents = [
    CHATTING_SOCKET_RECEIVE_EVENT.INIT,
    CHATTING_SOCKET_RECEIVE_EVENT.NORMAL,
    CHATTING_SOCKET_RECEIVE_EVENT.NOTICE,
    CHATTING_SOCKET_RECEIVE_EVENT.QUESTION,
    CHATTING_SOCKET_RECEIVE_EVENT.QUESTION_DONE
  ];

  socketEvents.forEach((event) => {
    socket.on(event, (payload) => handleSocketMessage(event, payload));
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connection error:', err);
    ports.forEach((port) => {
      port.postMessage({ type: 'error', payload: 'Socket connection failed' });
    });
  });

  socket.on('disconnect', () => {
    console.warn('Socket disconnected');
    ports.forEach((port) => {
      port.postMessage({ type: 'error', payload: 'Socket disconnected' });
    });
  });
};

// 소켓 리스너 초기화
initializeSocketListeners();

/** SharedWorker 연결 */
sharedWorker.onconnect = (e: MessageEvent) => {
  const port = e.ports[0];
  ports.push(port);
  port.start();

  // 포트 메시지 처리
  port.onmessage = (e) => {
    const { type, payload } = e.data;
    handlePortMessage(type, payload, port);
  };

  // 포트 종료 시 리소스 정리
  port.close = () => {
    const roomId = portRoomMap.get(port);

    if (roomId) {
      removePortFromRoom(roomId, port);
    }

    portRoomMap.delete(port);

    const portIndex = ports.indexOf(port);
    if (portIndex > -1) {
      ports.splice(portIndex, 1);
    }
  };
};
