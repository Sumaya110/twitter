import { useSession } from 'next-auth/react';
import Login from '@/components/Login/Login';
import styles from "@/components/Index/Index.module.css"
import Sidebar from "@/components/Sidebar/Sidebar"
import  Feed  from "@/components/Feed/Feed"
import Trending from '../Trending/Trending';



export default function Home() {
  const { data: session } = useSession();
  if (!session) return <Login />

  // function handleSignOut() {
  //   signOut();
  // }



  return (
    <div >
      <main className={styles.main}>
        <Sidebar />

        <div class="container">
          <Feed />
          <Trending />

        </div>


      </main>
    </div>
  );
}
