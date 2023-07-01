import React from 'react';
import classNames from 'classnames';
import styles from './Profile.module.scss';

export function Profile() {
  return (
    <div className={styles['e-header-profile']}>
      <div className={styles['e-header-profile__pid']}></div>
      <div className={classNames(styles['e-header-profile__pid'], styles['e-header-profile__pid--active'])}></div>
    </div>
  );
}
