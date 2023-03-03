import { FC } from 'react';
import { useAppSelector } from '@/hook/_index';
import { useTranslation } from 'react-i18next';

import './Message.scss';

import { IChatMessage } from '@/store/reducers/types/chat';

const Message: FC<{ mail: IChatMessage }> = ({ mail }) => {
  const { userName } = useAppSelector((state) => state.logInSlice);

  const { t } = useTranslation();

  const date = new Date(Date.parse(mail.date));
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const hoursView = hours < 9 ? `0${hours}` : `${hours}`;
  const minutesView = minutes < 9 ? `0${minutes}` : `${minutes}`;

  const renderDate = () => {
    if (mail.setDate) {
      return <div className="common_date">{mail.date.slice(0, 15)}</div>;
    }
  };

  return (
    <div>
      {renderDate()}
      <div className={`message ${mail.name === userName ? 'user' : 'player'}`}>
        <div className="message_caption">
          <div className="message_name">
            {mail.name === userName ? t('you') : `${mail.name}:`}
          </div>
          <div className="message_date">
            {hoursView}:{minutesView}
          </div>
        </div>
        <div className="message_text">{mail.text}</div>
      </div>
    </div>
  );
};

export default Message;
