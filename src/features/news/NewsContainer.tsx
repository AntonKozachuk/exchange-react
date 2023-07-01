import React from 'react';
import { NewsSection } from './NewsSection';
import { News } from './types';

export function NewsContainer() {
  const news: News[] = [
    {
      date: '14 мар.',
      title: 'Команда обменника Netex24 сегодня выложила первую часть большого обновления биржи Netex.Trade.',
      href: '#/news/842'
    },
    {
      date: '27 июля',
      title: 'Внимание! Мошеннические сайты действуют под нашим именем. Прочтите как менять в подлинном Netex24.net',
      href: '#/news/838'
    }
  ];

  return (
    <NewsSection
      title={'Новости'}
      moreLabel={'Все'}
      moreHref={'#/news'}
      news={news}
    />
  );
}
