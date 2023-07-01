import React from 'react';
import styles from './ExchangeLayout.module.scss';
import classNames from 'classnames';

type ExchangeLayoutProps = {
  children: React.ReactNode;
  sideBar: React.ReactNode;
  isTargetSelected: boolean;
  areCompactDirections: boolean;
}

export function ExchangeLayout(props: ExchangeLayoutProps) {
  const { children, sideBar, isTargetSelected, areCompactDirections } = props;

  return (
    <div className={styles['e-exchange-layout']}>
      <div className={classNames(styles['e-exchange-layout__directions'], {
          [styles['e-exchange-layout__directions--full-size']] : !areCompactDirections,
          [styles['e-exchange-layout__directions--has-target-direction']]: isTargetSelected
        })}
      >
        {children}
      </div>
      <div className={styles['e-exchange-layout__exchange']}>
        <div className={classNames(styles['e-exchange-layout__exchange-content'], {
            [styles['e-exchange-layout__exchange-content--inactive']]: !areCompactDirections
          })}
        >
          <div
            className={classNames(styles['e-exchange-layout__exchange-wrap'], {
              [styles['e-exchange-layout__exchange-wrap--target-selected']]: isTargetSelected,
            })}
          >
            {sideBar}
          </div>
        </div>
      </div>
    </div>
  );
}
