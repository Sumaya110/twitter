import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Feed from "../Feed/Feed";
import Trending from "../Trending/Trending";
import styles from "@/components/HomePage/HomePage.module.css";
import Login from "../Login/Login";
import { useRouter } from "next/router";
import { getUser } from "@/libs/action/userAction";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const User = await getUser(user?.email);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [user])


  return (
    <div>
      {existUser ? (
        
        <main className={styles.main}>
          <div className={styles.sidebar}>
            <Sidebar  user ={user}/>
          </div>

          <div className={styles.container}>
            <Feed user={user} />
            <Trending user={user} option={1} />
          </div>
        </main>
      ) :(
        <Login />
      ) }
    </div>
  );
};

export default HomePage;
