import React, { useEffect, useState } from 'react';
import { RefreshExchangeRate} from './components/RefreshExchangeRate';
import { useExchangeRefreshTimer } from './hooks/use-exchange-refresh-timer';
import { Spinner } from '../../common/components/Spinner';

type RefreshExchangeRateContainerProps = {
  sourceCourse: number;
  targetCourse: number;
}

const REFRESH_TIME = 30;
export function RefreshExchangeRateContainer(props: RefreshExchangeRateContainerProps) {
  const { sourceCourse, targetCourse } = props;

  const [progress, timeLeft] = useExchangeRefreshTimer(REFRESH_TIME, true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showRefreshExchangeRate, setShowRefreshExchangeRate] = useState(true);

  let rate;
  if (sourceCourse >= targetCourse) {
    rate = `1 : ${(sourceCourse / targetCourse).toFixed(6)}`;
  } else {
    rate = `${(targetCourse / sourceCourse).toFixed(6)} : 1`;
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (progress === 100) {
      setShowSpinner(true);
      setShowRefreshExchangeRate(false);

      timeout = setTimeout(() => {
        setShowSpinner(false);
        setShowRefreshExchangeRate(true);
      }, 1000);
    } else {
      setShowSpinner(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [progress]);

  useEffect(() => {
    if (!showRefreshExchangeRate) {
      const refreshTimeout = setTimeout(() => {
        setShowRefreshExchangeRate(true);
      }, REFRESH_TIME * 1000);

      return () => {
        clearTimeout(refreshTimeout);
      };
    }
  }, [showRefreshExchangeRate]);

  return (
    <>
      {showSpinner && <Spinner />}

      {showRefreshExchangeRate && (
        <RefreshExchangeRate
          label={'Курс'}
          rate={rate}
          progressPercents={progress}
          progressValue={timeLeft}
        />
      )}
    </>
  );
}





















