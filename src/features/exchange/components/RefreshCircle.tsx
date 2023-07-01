import React from 'react';
import styles from './RefreshCircle.module.scss'

type RefreshCircleProps = {
  size: number;
  strokeWidth?: number;
  stroke?: string;
  progress?: number;
}

export function RefreshCircle(props: RefreshCircleProps) {
  const {
    size,
    stroke = 'black',
    strokeWidth = 3,
    progress = 0,
  } = props;

  const halfOfCircle = size / 2;
  const radius = halfOfCircle - strokeWidth;
  const strokeDasharray = Math.PI * (radius * 2);
  const progressOffset = progress && strokeDasharray / 100 * progress;

  return (
    <svg className={styles['e-refresh-circle']} width={size} height={size} viewBox="0 0 30 30">
      <circle
        className={styles['e-refresh-circle__progress-value']}
        cx={halfOfCircle}
        cy={halfOfCircle}
        r={radius}
        strokeWidth={strokeWidth}
        // stroke="rgb(140, 156, 170)"
        // strokeDasharray="75.3982px"
        // strokeDashoffset="50px"
        // className="progress__value is-spin"
        //       style="stroke-dasharray: 75.3982px; stroke: rgb(140, 156, 170); stroke-width: 3px; stroke-dashoffset: 75.3982px;"
        style={{
          strokeDasharray: `${strokeDasharray}px`,
          stroke,
          strokeWidth: `${strokeWidth}px`,
          strokeDashoffset: `${progressOffset}px`,
        }}
      />
      <circle
        className={styles['e-refresh-circle__refresh-value']}
        cx={halfOfCircle}
        cy={halfOfCircle}
        r={radius}
        strokeWidth={strokeWidth}
        // className="refresh__value"
        // style="stroke-width: 3px;"
        style={{
          strokeWidth: `${strokeWidth}px`,
        }}
      />
    </svg>
  );
}
