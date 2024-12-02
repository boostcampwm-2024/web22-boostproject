import { UserInfoData, WhoAmI } from '@type/chat';
import { createContext, useReducer, ReactNode, useContext } from 'react';

type SettingOption = 'chat_notice' | 'ai_summary' | null;

interface ChatState {
  isSettingsOpen: boolean;
  settingOption: SettingOption;
  isNoticePopupOpen: boolean;
  isUserInfoPopupOpen: boolean;
  selectedUser: UserInfoData | null;
}

type Action =
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'CLOSE_SETTINGS' }
  | { type: 'SET_SETTING'; payload: SettingOption }
  | { type: 'TOGGLE_ANNOUNCEMENT_POPUP' }
  | { type: 'CLOSE_USER_INFO_POPUP' }
  | {
      type: 'SET_SELECTED_USER';
      payload: UserInfoData | null;
    }
  | { type: 'CLOSE_ALL' };

const chatReducer = (state: ChatState, action: Action): ChatState => {
  switch (action.type) {
    case 'TOGGLE_SETTINGS':
      return { ...state, isSettingsOpen: !state.isSettingsOpen };

    case 'CLOSE_SETTINGS':
      return { ...state, isSettingsOpen: false };

    case 'SET_SETTING':
      return {
        ...state,
        settingOption: action.payload,
        isNoticePopupOpen: action.payload === 'chat_notice',
        isUserInfoPopupOpen: action.payload !== 'chat_notice' ? state.isUserInfoPopupOpen : false
      };

    case 'TOGGLE_ANNOUNCEMENT_POPUP':
      return { ...state, isUserInfoPopupOpen: false, isNoticePopupOpen: !state.isNoticePopupOpen };

    case 'CLOSE_USER_INFO_POPUP':
      return { ...state, isUserInfoPopupOpen: false };

    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
        isNoticePopupOpen: false,
        isUserInfoPopupOpen: true
      };

    case 'CLOSE_ALL':
      return {
        isSettingsOpen: false,
        settingOption: null,
        isNoticePopupOpen: false,
        isUserInfoPopupOpen: false,
        selectedUser: null
      };

    default:
      return state;
  }
};

const initialState: ChatState = {
  isSettingsOpen: false,
  settingOption: null,
  isNoticePopupOpen: false,
  isUserInfoPopupOpen: false,
  selectedUser: null
};

export const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {
    throw new Error('ChatContext Provider를 확인하세요!');
  }
});

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('ChatContext Provider를 확인하세요!');
  }
  return context;
};
