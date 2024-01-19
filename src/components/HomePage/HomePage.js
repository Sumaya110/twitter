import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import Trending from "../Trending/Trending";
import styles from "@/components/HomePage/HomePage.module.css";
import Login from "../Login/Login";
import { useRouter } from "next/router";

const HomePage = ({ user }) => {
  const [existUser, setExistUser] = useState();
  const router= useRouter()

  useEffect(() => {
    const replace = async () => {
      if (!user) {
        await router.replace("/");
      } else {
        setExistUser(true);
      }
    };

    replace();
  }, [user, router]);

  return (
    <div>
      {existUser ? (
        
        <main className={styles.main}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>

          <div className={styles.container}>
            <Feed user={user}/>
            <Trending />
          </div>
        </main>
      ) :(
        <Login />
      ) }
    </div>
  );
};

export default HomePage;
