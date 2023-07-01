import React from 'react';
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
  const statisticData: StatisticData[] = [
    {
      value: '<a href="#">57 338</a>',
      title: `Отзывов на <a href="https://www.bestchange.ru/netex24-exchanger.html" target="_blank"><img src="${logoBest}" alt="BestChange"></a>`,
      imgSrc: bestSrc,
    },
    {
      value: '815',
      title: 'Новых клиентов за сутки',
      imgSrc: newClientSrc
    },
    {
      value: '1855',
      title: 'Обменов за сутки',
      imgSrc: exchangeSrc
    },
    {
      value: '$476 тыс',
      title: 'Оборот за сутки ',
      imgSrc: moneySrc
    },
    {
      value: '2033.9',
      title: 'PM TS',
      imgSrc: pmSrc
    },
    {
      value: '$1,3 млн',
      title: 'Резервы',
      imgSrc: reserveSrc
    },
  ];

  return (
    <MainStatistic
      title={'Netex24 в цифрах'}
      statistic={statisticData}
    />
  );
}
