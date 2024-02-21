import React, { useEffect } from "react";
import styles from "@/components/MessagePage/MessagePage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Messages from "../Messages/Messages";
import Conversation from "../Conversation/Conversation";
import { useRouter } from "next/router";
import Login from "../Login/Login";

const ConversationPage = ({ user, conversationId }) => {
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
              <Messages user={user} />
            </div>

            <div>
              <Conversation user={user} conversation_id={conversationId} />
            </div>
          </div>
        </main>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ConversationPage;
