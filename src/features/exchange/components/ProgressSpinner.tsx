import React from 'react';
import styles from './ProgressSpinner.module.scss';
import { RefreshCircle } from './RefreshCircle';

type ProgressSpinnerProps = {
  color?: string;
  value: string | number;
  size?: number;
  progress?: number;
}
export function ProgressSpinner(props: ProgressSpinnerProps) {
  const {
    color = 'rgb(140, 156, 170)',
    size = 30,
    progress= 0,
    value
  } = props;

  return (
    <div className={styles['e-progress-spinner']}>
      <RefreshCircle
        size={size}
        stroke={color}
        progress={progress}
      />
      <div
        className={styles['e-progress-spinner__value']}
        style={{
          color,
          lineHeight: `${size}px`
        }}
      >
        {value}
      </div>
    </div>
  )
}
