import React from 'react';
import styles from './LastTransactions.module.scss';
import { TransactionItem } from './TransactionItem';
import { Transaction } from '../../pages/index/types';

type LastTransactionsProps = {
  title: string;
  transactions: Transaction[];
}

export function LastTransactions(props: LastTransactionsProps) {
  const { title, transactions } = props;

  return (
    <div className={styles['e-last-transactions']}>
      <div className={styles['e-last-transactions__title']}>
        <span className={styles['e-last-transactions__title-wrapper']}>
          {title}
        </span>
      </div>

      <div className={styles['e-last-transactions__transactions-wrap']}>
        <div className={styles['e-last-transactions__transactions-container']}>
          {transactions.map((transaction: Transaction) => (
            <TransactionItem
              key={transaction.id}
              source={transaction.source}
              target={transaction.target}
              time={transaction.time}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
