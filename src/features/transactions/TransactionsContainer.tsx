import React from 'react';
import { LastTransactions } from './LastTransactions';
import { Transaction } from './types';
export function TransactionsContainer() {
  const lastTransactions: Transaction[] = [
    {
      id: '1',
      time: '1 минутy назад',
      source: {
        amount: '11600 ₽',
        currency: 'Qiwi'
      },
      target: {
        amount: '0.01665623 ฿',
        currency: 'Bitcoin'
      }
    },
    {
      id: '2',
      time: '2 минуты назад',
      source: {
        amount: '102.1 $ ',
        currency: 'PerfectMoney $'
      },
      target: {
        amount: '8000 ₽',
        currency: 'Сбербанк ₽'
      }
    }
  ];

  return (
    <LastTransactions
      transactions={lastTransactions}
      title={'Последние обмены '}
    />
  );
}
