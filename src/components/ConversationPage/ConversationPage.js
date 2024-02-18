import React from "react";
import styles from "@/components/MessagePage/MessagePage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Messages from "../Messages/Messages";
import Conversation from "../Conversation/Conversation";

const ConversationPage = ({ user, conversationId }) => {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.fixed}>
            <Sidebar user={user} option={1} />
          </div>

          <div>
            <Messages user={user} />
          </div>

          <div>
            <Conversation user={user} conversationId={conversationId} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConversationPage;
