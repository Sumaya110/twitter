import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import Trending from "../Trending/Trending";
import styles from "@/components/HomePage/HomePage.module.css";
import Login from "../Login/Login";
import { useRouter } from "next/router";

const HomePage = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    const replace = async () => {
      if (!user) {
        await router.replace("/");
      }
    };

    replace();
  }, [user, router]);

  return (
    <div>
      {user ? (
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.fixed}>
              <Sidebar user={user} option={1} />
            </div>
            <div>
              <Feed user={user} />
            </div>

            <div>
              <Trending user={user} option={1} />
            </div>
          </div>
        </main>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default HomePage;
