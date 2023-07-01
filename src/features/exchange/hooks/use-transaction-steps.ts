import React, { useEffect, useState } from 'react';
import { StepItem } from '../types';
import { PaymentSystem } from '../../payment-systems/types';

type UseTransactionStepsArgs = {
  sourcePaymentSystem: PaymentSystem | null;
  targetPaymentSystem: PaymentSystem | null;
}

export type TransactionStepsHookResult = [StepItem[], string, React.Dispatch<React.SetStateAction<string>>];

const FIRST_STEP_ID: string = '1';
export function useTransactionSteps({ sourcePaymentSystem, targetPaymentSystem }: UseTransactionStepsArgs): TransactionStepsHookResult {
  const steps: StepItem[] = [
    {
      id: FIRST_STEP_ID,
      number: '1',
      text: 'Ввод данных'
    },
    {
      id: '2',
      number: '2',
      text: 'Оплата'
    },
    {
      id: '3',
      number: '3',
      text: 'Завершение'
    }
  ];

  const [activeStepId, setActiveStepId] = useState<string>(steps[0].id);

  useEffect(() => {
    setActiveStepId(FIRST_STEP_ID);
  }, [sourcePaymentSystem, targetPaymentSystem])

  return [steps, activeStepId, setActiveStepId];
}
