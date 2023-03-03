import { useTranslation } from 'react-i18next';

import { useAppSettingsActions } from '@/hook/use-app-settings';
import { useAppSelector } from '@/hook/use-redux';

import './Settings.scss';

const Settings = () => {
  const { t, i18n } = useTranslation();

  const { theme, scheme, sound } = useAppSelector(
    (state) => state.appSettingsSlice,
  );

  const { changeTheme, changeScheme, toggleSound } = useAppSettingsActions();

  const handleLanguageButton = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleLightButton = () => {
    changeTheme('light');
    document.body.style.setProperty(
      '--background-color-100',
      'rgb(255, 255, 255, 1)',
    );
    document.body.style.setProperty('--text-color-100', 'rgb(0, 0, 0, 1)');
    document.body.style.setProperty('--text-color-50', 'rgb(0, 0, 0, 0.5)');
    localStorage.setItem('theme_mode', 'light');
  };

  const handleDarkButton = () => {
    changeTheme('dark');
    document.body.style.removeProperty('--background-color-100');
    document.body.style.removeProperty('--background-color-90');
    document.body.style.removeProperty('--text-color-100');
    document.body.style.removeProperty('--text-color-50');
    localStorage.removeItem('theme_mode');
  };

  const handleGreenButton = () => {
    changeScheme('green');
    document.body.style.removeProperty('--primary-color-100');
    document.body.style.removeProperty('--primary-color-75');
    document.body.style.removeProperty('--primary-color-50');
    document.body.style.removeProperty('--primary-color-25');
    localStorage.removeItem('color_scheme');
  };

  const handleBlueButton = () => {
    changeScheme('blue');
    document.body.style.setProperty(
      '--primary-color-100',
      'rgb(51, 204, 255, 1)',
    );
    document.body.style.setProperty(
      '--primary-color-75',
      'rgb(51, 204, 255, 0.75)',
    );
    document.body.style.setProperty(
      '--primary-color-50',
      'rgb(51, 204, 255, 0.5)',
    );
    document.body.style.setProperty(
      '--primary-color-25',
      'rgb(51, 204, 255, 0.25)',
    );
    localStorage.setItem('color_scheme', 'blue');
  };

  const handleSoundOn = () => {
    toggleSound(true);
    localStorage.removeItem('sound');
  };

  const handleSoundOff = () => {
    toggleSound(false);
    localStorage.setItem('sound', 'false');
  };

  return (
    <div className="settings">
      <h2 className="settings_title">{t('settings')}</h2>
      <div className="settings_section">
        <h3 className="settings_subtitle">{t('language')}</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${i18n.language === 'en' && 'active'}`}
            onClick={() => handleLanguageButton('en')}
          >
            {t('english')}
          </button>
          <button
            className={`settings_button ${i18n.language === 'ru' && 'active'}`}
            onClick={() => handleLanguageButton('ru')}
          >
            {t('russian')}
          </button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">{t('theme')}</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${theme === 'light' && 'active'}`}
            onClick={handleLightButton}
          >
            {t('light')}
          </button>
          <button
            className={`settings_button ${theme === 'dark' && 'active'}`}
            onClick={handleDarkButton}
          >
            {t('dark')}
          </button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">{t('scheme')}</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${scheme === 'green' && 'active'}`}
            onClick={handleGreenButton}
          >
            {t('green')}
          </button>
          <button
            className={`settings_button ${scheme === 'blue' && 'active'}`}
            onClick={handleBlueButton}
          >
            {t('blue')}
          </button>
        </div>
      </div>
      <div className="settings_section">
        <h3 className="settings_subtitle">{t('sound')}</h3>
        <div className="settings_options">
          <button
            className={`settings_button ${sound && 'active'}`}
            onClick={handleSoundOn}
          >
            {t('on')}
          </button>
          <button
            className={`settings_button ${!sound && 'active'}`}
            onClick={handleSoundOff}
          >
            {t('off')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
