import React, { useEffect, useState } from 'react';
import { RefreshExchangeRate} from './components/RefreshExchangeRate';
import { useExchangeRefreshTimer } from './hooks/use-exchange-refresh-timer';
import { Spinner } from '../../common/components/Spinner';

const REFRESH_TIME = 30;
export function RefreshExchangeRateContainer() {
  const [progress, timeLeft ] = useExchangeRefreshTimer(REFRESH_TIME, true);

  return (
    <>
      <Spinner />

      <RefreshExchangeRate
        label={'Курс'}
        rate={'1: 10000000'}
        progressPercents={progress}
        progressValue={timeLeft}
      />
    </>
  )
}
