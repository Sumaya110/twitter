import { useSession } from 'next-auth/react';
import Login from '@/components/Login/Login';
import Sidebar from "@/components/Sidebar/Sidebar"
import  Feed  from "@/components/Feed/Feed"
import Trending from '../Trending/Trending';
import styles from "@/components/Home/Home.module.css"



export default function Home() {

  const { data: session } = useSession();
  console.log("session  :  ", session)
  if (!session) return <Login />

  // function handleSignOut() {
  //   signOut();
  // }



  return (
    <div >
      <main className={styles.main}>

        <div className={styles.sidebar}>
        <Sidebar />
        </div>
        

        <div className={styles.container}>
          <Feed />
          <Trending />

        </div>


      </main>
    </div>
  );
}
