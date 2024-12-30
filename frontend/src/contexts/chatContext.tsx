import { createContext, useReducer, ReactNode } from 'react';

interface ChatState {
  isSettingsOpen: boolean;
  settingOption: null | 'chat_notice' | 'ai_summary';
  isNoticePopupOpen: boolean;
}

type Action =
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'CLOSE_SETTINGS' }
  | { type: 'SET_SETTING'; payload: null | 'chat_notice' | 'ai_summary' }
  | { type: 'TOGGLE_ANNOUNCEMENT_POPUP' }
  | { type: 'CLOSE_ALL' };

const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS': {
      return { ...state, isSettingsOpen: !state.isSettingsOpen };
    }

    case 'CLOSE_SETTINGS': {
      return { ...state, isSettingsOpen: false };
    }

    case 'SET_SETTING': {
      const newSettingOption = action.payload;
      const isNoticePopupOpen = newSettingOption === 'chat_notice';

      return {
        ...state,
        settingOption: newSettingOption,
        isNoticePopupOpen: isNoticePopupOpen
      };
    }

    case 'TOGGLE_ANNOUNCEMENT_POPUP': {
      return {
        ...state,
        isNoticePopupOpen: !state.isNoticePopupOpen
      };
    }

    case 'CLOSE_ALL': {
      return {
        isSettingsOpen: false,
        settingOption: null,
        isNoticePopupOpen: false
      };
    }

    default: {
      return state;
    }
  }
};

const initialState: ChatState = {
  isSettingsOpen: false,
  settingOption: null,
  isNoticePopupOpen: false
};

export const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>;
};
