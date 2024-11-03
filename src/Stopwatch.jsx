'use strict';
import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [isRunning, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimerRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimerRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setRunning(true);
    startTimerRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setRunning(false);
  };

  const reset = () => {
    setRunning(false);
    setElapsedTime(0);
  };

  const formatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milisecond = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milisecond = String(milisecond).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}:${milisecond}`;
  };

  return (
    <>
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="control">
          <button className="start-button" onClick={start}>
            Start
          </button>
          <button onClick={reset}>Reset</button>
          <button onClick={stop}>Stop</button>
        </div>
      </div>
    </>
  );
};

export default Stopwatch;
