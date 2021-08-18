import { useEffect, useState } from 'react';
import Timer from './Timer';

const useStopper = () => {
  const { time, isActive, start, stop, reset } = useStopper(0);
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setMseconds(mseconds => mseconds + 100);
      }, 100);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, mseconds]);

  return {
    time,
    start: () => isActive(true),
    stop: () => isActive(false),
    reset: () => {
      isActive(false);
      setMseconds(0);
    }
  };
};
export default useStopper;
