import { useTranslation } from 'react-i18next';

import './Rules.scss';

const Rules = () => {
  const { t } = useTranslation();

  return (
    <main className="rules">
      <h1 className="rules_title">{t('rulesOfTheGame')}</h1>
      <section className="rules_section">
        <h2 className="rules_subtitle">{t('description')}</h2>
        <p className="rules_paragrath">{t('descriptionFirst')}</p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">{t('arrange')}</h2>
        <p className="rules_paragrath">{t('arrangeParagraph')}</p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">{t('Ship types')}</h2>
        <p className="rules_paragrath">{t('Ship types paragraph')}</p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">{t('shipAttack')}</h2>
        <p className="rules_paragrath">{t('shipAttack paragraph')}</p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">{t('game progress')}</h2>
        <p className="rules_paragrath">{t('game progress paragraph')}</p>
      </section>
      <section className="rules_section">
        <h2 className="rules_subtitle">{t('battleWinner')}</h2>
        <p className="rules_paragrath">{t('battleWinnerFirst')}</p>
      </section>
    </main>
  );
};

export default Rules;
