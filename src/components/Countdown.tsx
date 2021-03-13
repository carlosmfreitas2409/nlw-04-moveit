import { useContext, useMemo, useState } from 'react';
import { MdCheckCircle, MdClose, MdPlayArrow } from 'react-icons/md';

import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    time,
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    startCountdown, 
    resetCountdown
  } = useContext(CountdownContext);

  const challengeTime = useMemo(() => time, []);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const timeLeftPercent = useMemo(() => {
    return Math.floor((1 - time / challengeTime) * 10000) / 100
  }, [challengeTime, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
          <MdCheckCircle size={20} color="#4CD62B" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
              Abandonar ciclo
              <MdClose size={20} color="#666666" />
              <div style={{ width: `${timeLeftPercent}%` }}/>
            </button>
          ) : (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar um ciclo
              <MdPlayArrow size={20} color="#ffffff" />
            </button>
          )}
        </>
      )}
    </div>
  )
}