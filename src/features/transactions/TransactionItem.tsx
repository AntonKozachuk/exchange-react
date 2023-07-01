import React from 'react';
import classNames from 'classnames';
import styles from './TransactionItem.module.scss';
import { PaymentDetails } from '../../pages/index/types';


type TransactionItemProps = {
  className?: string;
  source: PaymentDetails;
  target: PaymentDetails;
  time: string;
}

export function TransactionItem(props: TransactionItemProps) {
  const { className, source, target, time } = props;

  return (
    <div className={classNames(styles['e-transaction-item'], className)}>
      <div className={styles['e-transaction-item__wrap']}>
        <div className={classNames(
          styles['e-transaction-item__exchange-info'],
          styles['e-transaction-item__exchange-info--source']
        )}
        >
          <div data-amount>
            {source.amount}
          </div>

          <div data-currency>
            {source.currency}
          </div>
        </div>

        <div className={styles['e-transaction-item__divider']}></div>

        <div className={classNames(
          styles['e-transaction-item__exchange-info'],
          styles['e-transaction-item__exchange-info--target']
        )}
        >
          <div data-amount>
            {target.amount}
          </div>

          <div data-currency>
            {target.currency}
          </div>
        </div>

        <div className={styles['e-transaction-item__expire-minutes']}>
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}
