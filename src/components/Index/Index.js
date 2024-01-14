import { useSession } from 'next-auth/react';
import Login from '@/components/Login/Login';
import styles from "@/components/Index/Index.module.css"
import Sidebar from "@/components/Sidebar/Sidebar"



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
