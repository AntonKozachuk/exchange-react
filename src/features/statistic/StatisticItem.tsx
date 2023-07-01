import React from 'react';
import styles from './StatisticItem.module.scss';
import { StatisticData } from './types';

type StatisticItemProps = StatisticData;

export function StatisticItem(props: StatisticItemProps) {
  const { imgSrc, value, title } = props;

  return (
    <div className={styles['e-statistic-item']}>
      <img className={styles['e-statistic-item__icon']} src={imgSrc} alt=""/>

      <div className={styles['e-statistic-item__value']} dangerouslySetInnerHTML={{__html: value}} />
      <div className={styles['e-statistic-item__title']} dangerouslySetInnerHTML={{__html: title}} />
    </div>
  )
}
