import React from 'react';
import classNames from 'classnames';
import styles from './Spinner.module.scss';

type SpinnerProps = {
  rectsNumber?: number;
  color?: 'grey' | 'blue'
}

export function Spinner(props: SpinnerProps) {
  const {
    rectsNumber = 3,
    color = 'grey'
  } = props;

  return (
    <div className={styles['e-spinner']}>
      {Array.from({ length: rectsNumber } , (_: undefined, i: number) => (
        <React.Fragment key={color + i}>
          <div
            className={classNames(
              styles['e-spinner__rect'],
              styles[`e-spinner__rect--index-${i + 1}`],
              styles[`e-spinner__rect--${color}`]
            )}
          />
          {' '}
        </React.Fragment>
      ))}
    </div>
  )
}
