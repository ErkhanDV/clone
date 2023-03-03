import { useAppDispatch } from '@/hook/_index';
import * as chatActions from '@/store/reducers/ChatSlice';
import { IChatMessage } from '@/store/reducers/types/chat';
import { CHAT } from '@/store/_constants';

export const useChatActions = () => {
  const dispatch = useAppDispatch();

  const pushGameMessage = (message: IChatMessage) =>
    dispatch(chatActions.pushGameMessage(message));

  const pushCommonMessage = (message: IChatMessage) =>
    dispatch(chatActions.pushCommonMessage(message));

  const resetGameChat = () => dispatch(chatActions.resetGameChat());

  const resetCommonChat = () => dispatch(chatActions.resetCommonChat());

  const changeChat = (chatName: keyof typeof CHAT) =>
    dispatch(chatActions.changeChat(chatName));

  const setUnreadCommon = (reset = false) =>
    dispatch(chatActions.setUnreadCommon(reset));

  const setUnreadGame = (reset = false) =>
    dispatch(chatActions.setUnreadGame(reset));

  return {
    pushGameMessage,
    pushCommonMessage,
    resetGameChat,
    resetCommonChat,
    changeChat,
    setUnreadGame,
    setUnreadCommon,
  };
};
