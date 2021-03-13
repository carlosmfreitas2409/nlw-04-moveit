import { FiAward, FiHome, FiPower } from 'react-icons/fi';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import styles from '../styles/components/Sidebar.module.css';
import { useCallback } from 'react';

export function Sidebar() {
  const router = useRouter();

  const handleHomeClick = useCallback(() => {
    router.push('/dashboard');
  }, [router]);

  const handleLeaderboardClick = useCallback(() => {
    router.push('/leaderboard');
  }, [router]);
  
  return (
    <aside className={styles.sidebarContainer}>
      <img src="/logo.svg" alt="Move.it" />

      <ul>
        <li className={router.pathname == "/dashboard" ? styles.menuActive : ""} onClick={handleHomeClick}>
          <FiHome size={32} color="#666666" />
        </li>

        <li className={router.pathname == "/leaderboard" ? styles.menuActive : ""} onClick={handleLeaderboardClick}>
          <FiAward size={32} color="#666666" />
        </li>
      </ul>

      <button type="button" onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>
        <FiPower size={32} color="#666666" />
      </button>
    </aside>
  );
}