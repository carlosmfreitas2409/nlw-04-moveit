import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { GoMarkGithub } from 'react-icons/go';
import { FaGoogle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <img src="/symbol.svg" className={styles.background} />

      <div className={styles.content}>
        <img src="/logo-full-white.svg" alt="Move.it"/>

        <h2>Bem-vindo</h2>
        
        <div className={styles.github}>
          <FiLogIn size={40} color="#B3B9FF" />
          <p>Faça login com seu Github ou Google para começar!</p>
        </div>

        <button type="button" onClick={() => signIn('github', { callbackUrl: `${process.env.REACT_APP_URL}/dashboard` })}>
          <GoMarkGithub size={24} color="#B3B9FF" />
          Continuar com Github
        </button>

        <button type="button" onClick={() => signIn('google', { callbackUrl: `${process.env.REACT_APP_URL}/dashboard` })}>
          <FaGoogle size={24} />
          Continuar com Google
        </button>
      </div>
    </div>
  )
}