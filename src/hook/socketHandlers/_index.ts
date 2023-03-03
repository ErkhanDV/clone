import { useConnectionHandler } from './use-connection';
import { useReadyHandler } from './use-ready';
import { useShootHandler } from './use-shoot';
import { useGameoverHandler } from './use-gameover';
import { useExitHandler } from './use-exit';
import { useChatHandler } from './use-chat';
import { useMailingHandler } from './use-mailing';
import { useDisconnectHandler } from './use-disconnect';
import { useInviteHandler } from './use-invite';
import { useOnlineHandler } from './use-online';

export const useSocketHandlers = () => {
  const { connectHandler } = useConnectionHandler();
  const { disconnectHandler } = useDisconnectHandler();
  const { shootHandler } = useShootHandler();
  const { gameoverHandler } = useGameoverHandler();
  const { readyHandler } = useReadyHandler();
  const { exitHandler } = useExitHandler();
  const { chatHandler } = useChatHandler();
  const { mailingHandler } = useMailingHandler();
  const { inviteHandler } = useInviteHandler();
  const { onlineHandler } = useOnlineHandler();

  return {
    connectHandler,
    disconnectHandler,
    shootHandler,
    gameoverHandler,
    readyHandler,
    exitHandler,
    chatHandler,
    mailingHandler,
    inviteHandler,
    onlineHandler,
  };
};
