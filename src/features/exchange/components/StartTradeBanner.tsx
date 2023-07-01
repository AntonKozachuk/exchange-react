import React from 'react';
import classNames from 'classnames';
import styles from './StartTradeBanner.module.scss';

type BannerItem = {
  icon: string;
  title: string;
  subtitle: string;
}

type StartTradeBannerProps = {
  label?: string;
}

export function StartTradeBanner(props: StartTradeBannerProps) {
  const bannerItems: BannerItem[] = [
    {
      icon: `icon-1`,
      title: 'Торговля без верификации (KYC)',
      subtitle: 'Начинайте торговать без идентификации личности'
    },
    {
      icon: `icon-2`,
      title: 'Операции с рублем',
      subtitle: 'Через банковскую карту и Qiwi кошелёк'
    }
  ];

  return (
    <div className={styles['e-advertising-banner']}>
      <div className={styles['e-advertising-banner__title']}>
        <div className={classNames(styles['e-advertising-banner__logo'], 'e-no-select')}></div>
        <div
          className={classNames(styles['e-advertising-banner__label'], 'e-no-select')}
        >
          Криптовалютная биржа
          <br />
          от команды обменника
        </div>
      </div>

      <div className={classNames(styles['e-advertising-banner__body'], 'e-no-select')}>
        <div className={styles['e-advertising-banner__body-content']}>
          {bannerItems.map((bannerItem: BannerItem) => (
            <div key={bannerItem.title} className={styles['e-advertising-banner__banner-row']}>
              <div
                className={classNames(
                  styles['e-advertising-banner__banner-icon'],
                  styles[`e-advertising-banner__banner-icon--${bannerItem.icon}`]
                )}
              ></div>

              <div className={styles['e-advertising-banner__banner-row-body']}>
                <div className={styles['e-advertising-banner__banner-row-title']}>
                  {bannerItem.title}
                </div>

                <div className={styles['e-advertising-banner__banner-row-subtitle']}>
                  {bannerItem.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={classNames(styles['e-advertising-banner__body-footer'], 'e-no-select')}>
          <a
            className={styles['e-advertising-banner__body-footer-link']}
            href="#https://netex.trade/"
            target="_blank"
          >
            <div className={styles['e-advertising-banner__body-footer-label']}>Начать торговлю</div>
          </a>
        </div>
      </div>
    </div>
  )
}
