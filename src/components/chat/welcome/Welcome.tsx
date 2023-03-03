import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Welcome: FC = () => {
  const { t } = useTranslation();
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursView = hours < 9 ? `0${hours}` : `${hours}`;
  const minutesView = minutes < 9 ? `0${minutes}` : `${minutes}`;

  return (
    <div className="message player">
      <div className="message_caption">
        <div className="message_name">{t('admiral')}</div>
        <div className="message_date">
          {hoursView}:{minutesView}
        </div>
      </div>
      <div className="message_text">{t('welcomeMessage')}</div>
    </div>
  );
};

export default Welcome;
