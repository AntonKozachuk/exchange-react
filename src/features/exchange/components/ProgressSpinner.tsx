import React from 'react';
import styles from './ProgressSpinner.module.scss';
import { RefreshCircle } from './RefreshCircle';

type ProgressSpinnerProps = {
  color?: string;
  value: string | number;
  size: number;
  progress?: number;
}
export function ProgressSpinner(props: ProgressSpinnerProps) {
  const {
    color,
    size,
    progress = 0,
    value,
  } = props;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const displayValue = typeof value === 'number' && value >= 60 ? formatTime(value) : value;

  return (
    <div className={styles['e-progress-spinner']}>
      <RefreshCircle size={size} stroke={color} progress={progress} />
      <div
        className={styles['e-progress-spinner__value']}
        style={{
          color,
          lineHeight: `${size}px`,
          left: size > 30 ? '115%' : '0',
        }}
      >
        {displayValue}
      </div>
    </div>
  );
}
