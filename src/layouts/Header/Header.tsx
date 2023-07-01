import React, { useState } from 'react';
import styles from './Header.module.scss';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';
import { Profile } from './components/Profile/Profile';
import { MainButton } from '../../common/components/MainButton';
import { LanguageSelector } from './components/LanguageSelector/LanguageSelector';
import { LanguageSelectorItem, MenuItem } from './interfaces';
import { useMediaQuery } from '../../common/hooks/use-media-query';

import helpDeskImage from './helpDesk.svg';
import telegramImage from './telegram.svg';

export function Header() {
  const menuItems: MenuItem[] = [
    {
      href: '#/',
      label: 'Обмен',
      isActive: true,
    },
    {
      href: '#/aboutService',
      label: 'О сервисе',
    },
    {
      href: '#/tariffs',
      label: 'Тарифы',
    },
    {
      href: '#/termsOfUse',
      label: 'Правила использования',
    },
    {
      href: 'http://support.netex24.net/forums/2-baza-znanij/',
      label: 'База знаний',
    },
    {
      href: '#/moneybackPolicy',
      label: 'Политика возвратов',
    },
    {
      href: '#/feedback',
      label: 'Сотрудничество и PR',
    },
    {
      href: '#/partners',
      label: 'Партнерам',
    },
    {
      href: '#/kyt',
      label: 'Политика KYT',
    },
    {
      href: '#/payout-api',
      label: 'API массовые выплаты',
    },
  ];
  const languages = [
    {
      code: 'ru',
      label: 'Ru',
      href: '#ru'
    },
    {
      code: 'uk',
      label: 'Uk',
      href: '#en'
    }
  ];

  const [languageCode, setLanguageCode] = useState(languages[0].code);

  const isMdMatched: boolean = useMediaQuery('(max-width: 991px)');
  const shouldShowTg: boolean = useMediaQuery('(min-width: 768px)');

  return (
    <header className={styles['e-header']}>
      <div className={styles['e-header__logo-container']}>
        <a href="#/">
          <span className={styles['e-header__logo']}></span>
        </a>
      </div>

      <div className={styles['e-header__navigation']}>
        <div className={styles['e-header__buttons']}>
          {shouldShowTg && (
            <MainButton
              href={'#/?next=tg://resolve?domain=Netex24autoexchange_bot'}
              imgSrc={telegramImage}
              label={isMdMatched ? '' : 'Бот-обменник в Telegram'}
            />)
          }
          <MainButton
            href={'#/?next=http://support.netex24.net/'}
            className={styles['e-header--button-support']}
            imgSrc={helpDeskImage}
            label={isMdMatched ? '' : 'Тех. поддержка 24/7'}
          />
        </div>

        <div className={styles['e-header__buttons-portal']}>
          <Profile />
          <LanguageSelector
            items={languages}
            activeLangCode={languageCode}
            onSelect={(language: LanguageSelectorItem) => setLanguageCode(language.code)}
          />
        </div>

        <BurgerMenu items={menuItems} className={styles['e-header--burger-modifier']} />
      </div>
    </header>
  );
}
