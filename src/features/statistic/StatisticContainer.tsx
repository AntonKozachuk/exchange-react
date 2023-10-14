import React from 'react';
import { useTranslation } from 'react-i18next';
import { MainStatistic } from './MainStatistic';
import { StatisticData } from './types';

import logoBest from './images/logo-best.png';
import bestSrc from './images/main-stat-best.svg';
import newClientSrc from './images/main-stat-new-clients.svg';
import exchangeSrc from './images/main-stat-ex.svg';
import moneySrc from './images/main-stat-today-money.svg';
import pmSrc from './images/main-stat-pm.svg';
import reserveSrc from './images/main-stat-reserve.svg';

export function StatisticContainer() {
  const { t, i18n } = useTranslation();

  const generateTitle = () => {
    const imageTag = `<a href="https://www.bestchange.ru/netex24-exchanger.html" target="_blank"><img src="${logoBest}" alt="BestChange"></a>`;
    return i18n.language === 'en'
    ? `${imageTag + t('statistic.reviews')}`
    : `${t('statistic.reviews') + imageTag}`;
  };

  const statisticData: StatisticData[] = [
    {
      value: '<a href="#">57 338</a>',
      title: generateTitle(),
      imgSrc: bestSrc
    },
    {
      value: '815',
      title: t('statistic.newClients'),
      imgSrc: newClientSrc
    },
    {
      value: '1855',
      title: t('statistic.exchanged'),
      imgSrc: exchangeSrc
    },
    {
      value: '$476 тыс',
      title: t('statistic.money'),
      imgSrc: moneySrc
    },
    {
      value: '2033.9',
      title: 'PM TS',
      imgSrc: pmSrc
    },
    {
      value: '$1,3 млн',
      title: t('statistic.reserve'),
      imgSrc: reserveSrc
    }
  ];

  return <MainStatistic title={t('statistic.title')} statistic={statisticData} />;
}
