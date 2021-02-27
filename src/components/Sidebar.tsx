import { FiAward, FiHome, FiPower } from 'react-icons/fi';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from '../styles/components/Sidebar.module.css';

export function Sidebar() {
  const router = useRouter();
  
  return (
    <aside className={styles.sidebarContainer}>
      <img src="/logo.svg" alt="Move.it" />

      <ul>
        <li className={router.pathname == "/dashboard" ? styles.menuActive : ""}>
          <Link href="/dashboard">
            <FiHome size={32} color="#666666" />
          </Link>
        </li>

        <li className={router.pathname == "/leaderboard" ? styles.menuActive : ""}>
          <Link href="/leaderboard">
            <FiAward size={32} color="#666666" />
          </Link>
        </li>
      </ul>

      <button type="button" onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>
        <FiPower size={32} color="#666666" />
      </button>
    </aside>
  );
}