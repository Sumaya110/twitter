import React from "react";
import styles from "@/components/MessagePage/MessagePage.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Messages from "../Messages/Messages";
import NewMessage from "../NewMessage/NewMessage";


const MessagePage = ({ user }) => {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.container}>
          <Sidebar user={user} />
          <Messages user={user} />
          <NewMessage user={user} />
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
