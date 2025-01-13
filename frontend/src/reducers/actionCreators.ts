// Video Player Actions
export const playPause = () => ({ type: 'PLAY_PAUSE' } as const);
export const muteToggle = () => ({ type: 'MUTE_TOGGLE' } as const);
export const setVolume = (volume: number) => ({ type: 'SET_VOLUME', payload: volume } as const);
export const setCurrentTime = (time: number) => ({ type: 'SET_CURRENT_TIME', payload: time } as const);
export const setDuration = (duration: number) => ({ type: 'SET_DURATION', payload: duration } as const);
export const setDvrEnabled = (enabled: boolean) => ({ type: 'SET_DVR_ENABLED', payload: enabled } as const);
export const setAtLiveEdge = (isAtLiveEdge: boolean) => ({ type: 'SET_AT_LIVE_EDGE', payload: isAtLiveEdge } as const);
export const setBufferedSegments = (buffered: TimeRanges) =>
  ({ type: 'SET_BUFFERED_SEGMENTS', payload: buffered } as const);
export const setIsLive = (isLive: boolean) => ({ type: 'SET_IS_LIVE', payload: isLive } as const);
export const setIsPlaying = (isPlaying: boolean) => ({ type: 'SET_IS_PLAYING', payload: isPlaying } as const);

// Controls Actions
export const showControls = () => ({ type: 'SHOW_CONTROLS' } as const);
export const hideControls = () => ({ type: 'HIDE_CONTROLS' } as const);
export const setPreviewTime = (time: number | null) => ({ type: 'SET_PREVIEW_TIME', payload: time } as const);
export const setPreviewPos = (pos: number) => ({ type: 'SET_PREVIEW_POS', payload: pos } as const);
export const setIsDragging = (isDragging: boolean) => ({ type: 'SET_IS_DRAGGING', payload: isDragging } as const);
