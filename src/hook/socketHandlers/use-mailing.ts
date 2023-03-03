import { IMailing } from '@/store/reducers/types/socket';
import { CHAT } from '@/store/_constants';
import { useChatActions } from '../_index';

export const useMailingHandler = () => {
  const { pushCommonMessage, pushGameMessage } = useChatActions();

  const mailingHandler = ({ chatMessage, chatName }: IMailing) => {
    chatMessage.forEach((message) => {
      if (chatName === CHAT.common) {
        pushCommonMessage(message);
      }

      if (chatName === CHAT.game) {
        pushGameMessage(message);
      }
    });
  };

  return { mailingHandler };
};
