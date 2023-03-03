import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Home.scss';

import { Chat } from '@/components/_index';

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <main className="main">
        <section className="section">
          <h2 className="section_title">{t('Welcome to the BattleShip!')}</h2>
          <p className="section_paragraph">{t('welcomeFirst')}</p>
          <p className="section_paragraph">{t('welcomeSecond')}</p>
          <Link to="/rules" className="section_button">
            {t('rulesOfTheGame')}
          </Link>
        </section>
        <section className="section">
          <h2 className="section_title">{t('profile')}</h2>
          <p className="section_paragraph">{t('youCanPlay')}</p>
          <Link to="/gameSP" className="section_button">
            {`${t('game')} ${t('vsComputer')}`}
          </Link>
          <p className="section_paragraph">{t('loginPlease')}</p>
        </section>
        <Chat />
      </main>
    </div>
  );
};

export default Home;
