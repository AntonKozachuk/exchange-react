import React from 'react';
import classNames from 'classnames';
import styles from './ExchangeSteps.module.scss';
import { StepItem } from '../types';

type ExchangeStepsProps = {
  onStepBack(): void;
  isShortView: boolean;
  steps: StepItem[];
  activeStepId: string;
}

export function ExchangeSteps(props: ExchangeStepsProps) {
  const { onStepBack, isShortView, steps, activeStepId } = props;

  return (
    <div
      className={classNames(styles['e-exchange-steps'], {
        [styles['e-exchange-steps--short-view']]: isShortView,
      })}
    >
      <div className={styles['e-exchange-steps__steps-wrapper']}>
        <div className={styles['e-exchange-steps__back-button']} onClick={onStepBack}></div>

        {steps.map((item: StepItem, index: number) => (
          <React.Fragment key={item.id}>
            {index > 0 && (
              <div className={styles['e-exchange-steps__separator']} />
            )}

            <div className={styles['e-exchange-steps__step']}>
              <div
                className={classNames(styles['e-exchange-steps__step-number'], {
                  [styles['e-exchange-steps__step-number--active']]: item.id === activeStepId || index < steps.findIndex((step) => step.id === activeStepId),
                })}
              >
                {item.number}
              </div>

              <div
                className={classNames(styles['e-exchange-steps__step-text'], {
                  [styles['e-exchange-steps__step-text--active']]: item.id === activeStepId || index < steps.findIndex((step) => step.id === activeStepId),
                })}
              >
                {item.text}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}




