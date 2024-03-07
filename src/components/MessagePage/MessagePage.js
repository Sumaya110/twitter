import React, { useEffect } from "react";
import styles from "@/components/MessagePage/MessagePage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import MessagesAgain from "@/components/MessagesAgain/MessagesAgain"
import { useRouter } from "next/router";
import Login from "../Login/Login";

const MessagePage = ({ user }) => {
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
            <MessagesAgain user={user}/>
          </div>

        </div>
      </main>
      ) : (
        <Login />
      )}
    </div>
    
  );
};

export default MessagePage;
