import { useState, useEffect } from 'react';

const PERCENTS_100 = 100;

type ReturnValue = [number, number, (value: boolean) => void];

export function useExchangeRefreshTimer(duration: number, enabled: boolean = false): ReturnValue {
  const [progress, setProgress] = useState<number>(0);
  const [isEnabled, setIsEnabled] = useState<boolean>(enabled);

  useEffect(() => {
    const step: number = PERCENTS_100 / duration;

    let timer: NodeJS.Timer;

    if (isEnabled) {
      timer = setInterval(() => {
        setProgress((currentProgress: number): number => {
          const newProgress: number = currentProgress + step;

          if (newProgress > PERCENTS_100) return 0;

          return +newProgress.toFixed(3);
        });
      }, 1000);
    }

    return () => {
      if (isEnabled) {
        clearTimeout(timer);
      }
    };
  }, [duration, isEnabled])

  const timeLeft: number = +((PERCENTS_100 - progress) * duration / PERCENTS_100).toFixed(0);

  return [progress, timeLeft, setIsEnabled];
}
