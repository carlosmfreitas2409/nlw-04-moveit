import Head from 'next/head';

import { Sidebar } from '../components/Sidebar';

import styles from '../styles/pages/Leaderboard.module.css';

export default function Leaderboard() {
  return (
    <>
      <Sidebar />

      <div className={styles.leaderboardContainer}>
        <Head>
          <title>Leaderboard | move.it</title>
        </Head>

        <h2>Leaderboard</h2>

        <div className={styles.comming}>Em-breve</div>
      </div>
    </>
  );
}