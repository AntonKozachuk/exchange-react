import React from 'react';
import styles from './PageTemplate.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { BannersContainer } from '../../features/banners/BannersContainer';

type Props = {
  children?: React.ReactNode;
};

export function PageTemplate(props: Props) {
  const { children } = props;

  return (
    <div className={styles['e-page-template']}>
      <div className={styles['e-page-template__header-container']}>
        <div className={styles['e-page-template__header-content']}>
          <Header />


          <div className={styles['e-page-template__header-banners']}>
            <BannersContainer />
          </div>
        </div>
      </div>

      <div className={styles['e-page-template__content-section']}>
        <div className={styles['e-page-template__content-container']}>
          {children}
        </div>
      </div>

      <Footer />
    </div>
  )
}
