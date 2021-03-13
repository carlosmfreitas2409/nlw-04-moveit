import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession, useSession, Session } from 'next-auth/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { Sidebar } from '../components/Sidebar';

import styles from '../styles/pages/Dashboard.module.css';

interface User {
  level: number;
  current_experience: number;
  challenges_completed: number;
}

interface DashboardProps {
  session: Session;
}

export default function Dashboard({ session }: DashboardProps) {
  const [showPage, setShowPage] = useState(false);
  const [user, setUser] = useState<User>();
  
  const [, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if(!loading && !session) {
      router.push('/');
    }
  }, [session, loading, router]);

  useEffect(() => {
    if(session) {
      axios.get<User>(`/api/challenges?users=${session.user.email}`).then((res) => {
        const { level, current_experience, challenges_completed } = res.data;

        setUser({
          level, 
          current_experience, 
          challenges_completed
        });

        setShowPage(true);
      })
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <Sidebar />

      {session && showPage && (
        <ChallengesProvider 
          email={session.user.email}
          level={user.level} 
          currentExperience={user.current_experience}
          challengesCompleted={user.challenges_completed}
        >
          <div style={{ marginLeft: '7rem' }}>
            <div className={styles.container}>
              <ExperienceBar />

              {!loading && (
                <CountdownProvider>
                  <section>
                    <div>
                      <Profile />
                      <CompletedChallenges />
                      <Countdown />
                    </div>

                    <div>
                      <ChallengeBox />
                    </div>
                  </section>
                </CountdownProvider>    
              )}
            </div>
          </div>
        </ChallengesProvider>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      session
    }
  }
}