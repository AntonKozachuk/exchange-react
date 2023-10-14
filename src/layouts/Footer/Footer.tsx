import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export function Footer() {
  const { t } = useTranslation();

  return (
    <div className={styles['e-footer']}>
      <div className={styles['e-footer__wrapper']}>
        <div className={styles['e-footer__title']}>
          © Netex24.net
        </div>

        <div className={styles['e-footer__title']}>
          {t('footer.title')}
        </div>

        <div className={styles['e-footer__description']}>
          <span>{t('footer.about')}</span>
          <br />
          <a href="#support@netex24.net">support@netex24.net</a>
        </div>

        <div className={styles['e-footer__description']}>
          {t('footer.description')}
        </div>
      </div>
    </div>
  )
}
