import React from 'react';
import cashbackSrc from './images/top-banner-cashback.png';
import top25Src from './images/top-banner-25.png';
import paymentSrc from './images/top-banner-payout.png';
import { Banners } from './Banners';

export function BannersContainer() {
  const slides = [
    {
      title: 'Кешбэк с каждого обмена',
      text: 'Начисляем кешбэк от 3% до 25%<br> на бонусный счёт биржи<br> NetexTrade',
      imgSrc: cashbackSrc
    },
    {
      title: 'Разыгрываем 25 000 руб. каждую неделю',
      text: 'Оставляй отзыв к обмену, становись участником и получай выигрыш',
      imgSrc: top25Src
    },
    {
      title: 'API для массовых<br> выплат на карты',
      text: 'Начисляем кешбэк от 3% до 25%<br> на бонусный счёт биржи<br> NetexTrade',
      imgSrc: paymentSrc
    }
  ];

  return (
    <Banners slides={slides} />
  );
}
