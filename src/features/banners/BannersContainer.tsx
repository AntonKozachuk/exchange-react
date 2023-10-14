import React from 'react';
import { useTranslation } from 'react-i18next';
import cashbackSrc from './images/top-banner-cashback.png';
import top25Src from './images/top-banner-25.png';
import paymentSrc from './images/top-banner-payout.png';
import { Banners } from './Banners';

export function BannersContainer() {
  const { t } = useTranslation();
  const slides = [
    {
      title: t('banners.cashback.title'),
      text: t('banners.cashback.text'),
      imgSrc: cashbackSrc
    },
    {
      title: t('banners.giveaway.title'),
      text: t('banners.giveaway.text'),
      imgSrc: top25Src
    },
    {
      title: t('banners.api.title'),
      text: t('banners.api.text'),
      imgSrc: paymentSrc
    }
  ];

  return (
    <Banners slides={slides} />
  );
}
