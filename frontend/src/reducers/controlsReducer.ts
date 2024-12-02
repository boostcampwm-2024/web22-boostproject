export interface ControlsState {
  isControlsVisible: boolean;
  previewTime: number | null;
  previewPos: number;
  isDragging: boolean;
}

export const initialControlsState: ControlsState = {
  isControlsVisible: true,
  previewTime: null,
  previewPos: 0,
  isDragging: false
};

export type ControlsAction =
  | { type: 'SHOW_CONTROLS' }
  | { type: 'HIDE_CONTROLS' }
  | { type: 'SET_PREVIEW_TIME'; payload: number | null }
  | { type: 'SET_PREVIEW_POS'; payload: number }
  | { type: 'SET_IS_DRAGGING'; payload: boolean };

export const controlsReducer = (state: ControlsState, action: ControlsAction): ControlsState => {
  switch (action.type) {
    case 'SHOW_CONTROLS':
      return { ...state, isControlsVisible: true };
    case 'HIDE_CONTROLS':
      return { ...state, isControlsVisible: false };
    case 'SET_PREVIEW_TIME':
      return { ...state, previewTime: action.payload };
    case 'SET_PREVIEW_POS':
      return { ...state, previewPos: action.payload };
    case 'SET_IS_DRAGGING':
      return { ...state, isDragging: action.payload };
    default:
      return state;
  }
};
