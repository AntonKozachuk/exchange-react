import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';
import { Profile } from './components/Profile/Profile';
import { MainButton } from '../../common/components/MainButton';
import { LanguageSelector } from './components/LanguageSelector/LanguageSelector';
import { LanguageSelectorItem, MenuItem } from './interfaces';
import { useMediaQuery } from '../../common/hooks/use-media-query';

import helpDeskImage from './helpDesk.svg';
import telegramImage from './telegram.svg';
import classNames from 'classnames';

export function Header() {
  const { t, i18n } = useTranslation();
  const menuItems: MenuItem[] = [
    {
      href: '#/',
      label: t('menu.exchange'),
      isActive: true
    },
    {
      href: '#/aboutService',
      label: t('menu.aboutService')
    },
    {
      href: '#/tariffs',
      label: t('menu.tariffs')
    },
    {
      href: '#/termsOfUse',
      label: t('menu.termsOfUse')
    },
    {
      href: 'http://support.netex24.net/forums/2-baza-znanij/',
      label: t('menu.knowledgeBase')
    },
    {
      href: '#/moneybackPolicy',
      label: t('menu.moneyBack')
    },
    {
      href: '#/feedback',
      label: t('menu.feedback')
    },
    {
      href: '#/partners',
      label: t('menu.partners')
    },
    {
      href: '#/kyt',
      label: t('menu.kyt')
    },
    {
      href: '#/payout-api',
      label: t('menu.payoutApi')
    }
  ];
  const languages = [
    {
      code: 'ru',
      label: 'Ru',
      href: '#ru'
    },
    {
      code: 'en',
      label: 'En',
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
          {i18n.language === 'ru' ? (
            <span className={styles['e-header__logo']}></span>
          ) : (
            <span
              className={classNames(
                styles['e-header__logo'],
                styles['e-header__logo-en']
              )}
            ></span>
          )}
        </a>
      </div>

      <div className={styles['e-header__navigation']}>
        <div className={styles['e-header__buttons']}>
          {shouldShowTg && (
            <MainButton
              href={'#/?next=tg://resolve?domain=Netex24autoexchange_bot'}
              imgSrc={telegramImage}
              label={isMdMatched ? '' : t('header.telegram')}
            />
          )}
          <MainButton
            href={'#/?next=http://support.netex24.net/'}
            className={styles['e-header--button-support']}
            imgSrc={helpDeskImage}
            label={isMdMatched ? '' : t('header.support')}
          />
        </div>

        <div className={styles['e-header__buttons-portal']}>
          <Profile />
          <LanguageSelector
            items={languages}
            activeLangCode={languageCode}
            onSelect={(language: LanguageSelectorItem) =>
              setLanguageCode(language.code)
            }
          />
        </div>

        <BurgerMenu
          items={menuItems}
          className={styles['e-header--burger-modifier']}
        />
      </div>
    </header>
  );
}
