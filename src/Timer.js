import React, { useState, useEffect } from 'react';
import pretty from 'pretty-ms';
import useStopper from './useStopper';

const Timer = () => {
  const [mseconds, setMseconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [korok, setkorok] = useState([]);
  console.log(korok);

  function toggle() {
    setIsActive(isActive => !isActive);
  }

  function reset() {
    setMseconds(0);
    setkorok([]);
    setIsActive(false);
  }

  function newCircle() {
    setkorok([...korok, mseconds]);
  }

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

  const msToSeconds = () => {
    let seconds = ms / 1000;
    return `${seconds}`;
  };

  return (
    <div className="app">
      <div className="row" />

      <h1>{pretty(mseconds, { colonNotation: true })}</h1>
      <button
        className={`button button-primary button-primary-${
          isActive ? 'active' : 'inactive'
        }`}
        onClick={toggle}
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button className="buttonCircle" onClick={newCircle}>
        Új kör
      </button>
      <div className="records">
        <row>
          {korok.length > 0 &&
            korok.map((kor, index) => {
              return (
                <p>
                  <span>{(index, +1 + '.kör\t')}</span>
                  <span>
                    {pretty(kor, {
                      colonNotation: true,
                      keepDecimalsOnWholeSeconds: true
                    })}
                  </span>
                </p>
              );
            })}
        </row>
      </div>
      <button className="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
};
export default Timer;
