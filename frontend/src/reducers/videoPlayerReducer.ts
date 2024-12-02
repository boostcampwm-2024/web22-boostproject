export interface VideoPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  dvrEnabled: boolean;
  isAtLiveEdge: boolean;
  bufferedSegments: TimeRanges | null;
  isLive: boolean;
}

export const initialVideoPlayerState: VideoPlayerState = {
  isPlaying: false,
  isMuted: false,
  volume: 1,
  currentTime: 0,
  duration: 0,
  dvrEnabled: false,
  isAtLiveEdge: true,
  bufferedSegments: null,
  isLive: false
};

export type VideoPlayerAction =
  | { type: 'PLAY_PAUSE' }
  | { type: 'MUTE_TOGGLE' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_DVR_ENABLED'; payload: boolean }
  | { type: 'SET_AT_LIVE_EDGE'; payload: boolean }
  | { type: 'SET_BUFFERED_SEGMENTS'; payload: TimeRanges }
  | { type: 'SET_IS_LIVE'; payload: boolean }
  | { type: 'SET_IS_PLAYING'; payload: boolean }
  | { type: 'SET_MUTED'; payload: boolean };

export const videoPlayerReducer = (state: VideoPlayerState, action: VideoPlayerAction): VideoPlayerState => {
  switch (action.type) {
    case 'PLAY_PAUSE':
      return { ...state, isPlaying: !state.isPlaying };
    case 'MUTE_TOGGLE':
      return { ...state, isMuted: !state.isMuted };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    case 'SET_MUTED':
      return { ...state, volume: action.payload ? 0 : 0.1, isMuted: action.payload };
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_DVR_ENABLED':
      return { ...state, dvrEnabled: action.payload };
    case 'SET_AT_LIVE_EDGE':
      return { ...state, isAtLiveEdge: action.payload };
    case 'SET_BUFFERED_SEGMENTS':
      return { ...state, bufferedSegments: action.payload };
    case 'SET_IS_LIVE':
      return { ...state, isLive: action.payload };
    case 'SET_IS_PLAYING':
      return { ...state, isPlaying: action.payload };
    default:
      return state;
  }
};
