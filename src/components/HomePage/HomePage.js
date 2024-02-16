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
  const router = useRouter();


  useEffect(() => {
    const replace = async () => {
      if (!user) {
        await router.replace("/");
      } else {
        const fetchData = async () => {
          try {
            const User = await getUser(user?._id);
            setExistUser(User);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        fetchData();
      }
    };

    replace();
  }, [user, router]);

  return (
    <div>
      {existUser ? (
        <main className={styles.main}>
         

          <div className={styles.container}>
            <div className={styles.fixed}>
            <Sidebar  user={user} option={1}/>
            </div>
           <div>
           <Feed user={user} />
           </div>
           
           <div >
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
