import { useAppDispatch } from '@/hook/_index';
import * as inviteStateActions from '@/store/reducers/InviteStateSlice';

export const useInviteStateActions = () => {
  const dispatch = useAppDispatch();

  const setInvite = (server: string) =>
    dispatch(inviteStateActions.setInvite(server));

  const setInviteValidation = (state: string) =>
    dispatch(inviteStateActions.setInviteValidation(state));

  const setInviteInProgress = (state: boolean) =>
    dispatch(inviteStateActions.setInviteInProgress(state));

  const setInviteTo = (user: string) =>
    dispatch(inviteStateActions.setInviteTo(user));

  const resetInviteState = () =>
    dispatch(inviteStateActions.resetInviteState());
  return {
    setInvite,
    setInviteValidation,
    setInviteInProgress,
    resetInviteState,
    setInviteTo,
  };
};
