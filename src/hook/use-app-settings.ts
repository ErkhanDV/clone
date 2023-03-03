import { useAppDispatch } from '@/hook/_index';
import * as appSettings from '@/store/reducers/AppSettingsSlice';

export const useAppSettingsActions = () => {
  const dispatch = useAppDispatch();

  const changeTheme = (theme: string) => {
    dispatch(appSettings.changeTheme(theme));
  };

  const changeScheme = (scheme: string) => {
    dispatch(appSettings.changeScheme(scheme));
  };

  const toggleSound = (sound: boolean) => {
    dispatch(appSettings.toggleSound(sound));
  };

  return {
    changeTheme,
    changeScheme,
    toggleSound,
  };
};
