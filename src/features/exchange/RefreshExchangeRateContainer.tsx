import React, { useEffect, useState } from 'react';
import { RefreshExchangeRate} from './components/RefreshExchangeRate';
import { useExchangeRefreshTimer } from './hooks/use-exchange-refresh-timer';
import { Spinner } from '../../common/components/Spinner';
import { useTranslation } from 'react-i18next';

type RefreshExchangeRateContainerProps = {
  sourceCourse: number;
  targetCourse: number;
}

const REFRESH_TIME = 30;
export function RefreshExchangeRateContainer(props: RefreshExchangeRateContainerProps) {
  const { sourceCourse, targetCourse } = props;

  const [timerKey, setTimerKey] = useState(0);
  const [progress, timeLeft] = useExchangeRefreshTimer(REFRESH_TIME, true, timerKey);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showRefreshExchangeRate, setShowRefreshExchangeRate] = useState(true);
  const { t } = useTranslation();

  let rate;
  if (sourceCourse >= targetCourse) {
    rate = `1 : ${(sourceCourse / targetCourse).toFixed(4).replace(/\.?0+$/, '')}`;
  } else {
    rate = `${(targetCourse / sourceCourse).toFixed(4).replace(/\.?0+$/, '')} : 1`;
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

  useEffect(() => {
    setTimerKey(prevKey => prevKey + 1);
  }, [sourceCourse, targetCourse]);  

  return (
    <>
      {showSpinner && <Spinner />}

      {showRefreshExchangeRate && (
        <RefreshExchangeRate
          label={t('refreshExchangeRate')}
          rate={rate}
          progressPercents={progress}
          progressValue={timeLeft}
        />
      )}
    </>
  );
}





















