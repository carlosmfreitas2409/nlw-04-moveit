import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { isActive, resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }
  
  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge && (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>{activeChallenge.type === 'body' ? 'Exercite-se' : 'Mova os olhos'}</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button" 
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
                Falhei
            </button>

            <button 
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      )}
      
      {!activeChallenge && isActive && (
        <div className={styles.challengeNotActive}>
          <strong>Atente-se ao tempo restante para o novo desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Caso complete o desafio, ganhará experiência para avançar de level.
          </p>
        </div>
      )}
      
      {!activeChallenge && !isActive && (
        <div className={styles.challengeNotActive}>
          <strong>Inicie um ciclo para receber desafios ao final da contagem regressiva</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de level ganhando experiência completando estes desafios.
          </p>
        </div>
      )}
    </div>
  )
}