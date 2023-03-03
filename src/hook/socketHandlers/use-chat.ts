import { useAppSelector, useChatActions } from '@/hook/_index';
import { IMessage } from '@/store/reducers/types/socket';
import { CHAT } from '@/store/_constants';
import Sound from '@/lib/API/Sound/Sound';

export const useChatHandler = () => {
  const { pushGameMessage, pushCommonMessage, setUnreadCommon, setUnreadGame } =
    useChatActions();
  const { gameInfo, userName, sound } = useAppSelector((state) => {
    const { gameInfo } = state.gameStateSlice;
    const { userName } = state.logInSlice;
    const { sound } = state.appSettingsSlice;

    return { gameInfo, userName, sound };
  });

  const chatHandler = ({ mail }: IMessage) => {
    if (mail.chatName === CHAT.game) {
      if (gameInfo?.gameId === mail.gameId) {
        if (sound) {
          Sound('chat');
        }

        pushGameMessage(mail);
        if (userName !== mail.name) setUnreadGame();
      }
    }

    if (mail.chatName === CHAT.common) {
      if (sound) {
        Sound('chat');
      }

      pushCommonMessage(mail);
      if (userName !== mail.name) setUnreadCommon();
    }
  };

  return { chatHandler };
};
