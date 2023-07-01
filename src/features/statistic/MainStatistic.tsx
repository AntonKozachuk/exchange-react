import React from 'react';
import styles from './MainStatistic.module.scss';
import { StatisticItem } from './StatisticItem';
import { StatisticData } from './types';

type MainStatisticProps = {
  title: string;
  statistic: StatisticData[];
}

export function MainStatistic(props: MainStatisticProps) {
  const { title, statistic } = props;

  return (
    <div className={styles['e-main-statistic']}>
      <div>
        <div className={styles['e-main-statistic__title']}>
          {title}
        </div>

        <div className={styles['e-main-statistic__stat-wrap']}>
          {statistic.map((stat) => (
            <StatisticItem
              key={stat.title}
              title={stat.title}
              value={stat.value}
              imgSrc={stat.imgSrc}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
