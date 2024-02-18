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
          <div className={styles.fixed}>
            <Sidebar user={user} option={1} />
          </div>
          <div>
            <Messages user={user} />
          </div>

          <div>
            <NewMessage user={user} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagePage;
