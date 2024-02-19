import React, { useEffect, useState } from "react";
import styles from "@/components/Messages/Messages.module.css";
import { CiSettings } from "react-icons/ci";
import { LuMailPlus } from "react-icons/lu";
import { getUsers } from "@/libs/action/userAction";
import EachUser from "../EachUser/EachUser";
import io from "socket.io-client";
import { getConversations } from "@/libs/action/conversationAction";

const Messages = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
    fetchConversations();
  }, [user, notification]);

  const fetchData = async () => {
    try {
      const data = await getUsers();

      const filteredUsers = data.filter((u) => u._id !== user?._id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchConversations = async () => {
    const allConversations = await getConversations();

    // console.log("all con:: ", allConversations);

    const notifications = [];

    allConversations?.forEach((conversation) => {
      const { messages } = conversation;
      const lastMessage = messages[messages?.length - 1];

      if (lastMessage?.receiverId === user?._id && !lastMessage?.seen) {
        // console.log("lll", lastMessage);
        notifications.push({ lastMessage, roomId: conversation?._id });
      }
    });

    setNotification(notifications.length > 0 ? notifications : null);

    console.log("notification ::  ", notification);
  };

  return (
    <div className={styles.section}>
      <div className={styles.fixedHeader}>
        <span className={styles.text}>Messages</span>
        <div className={styles.icons}>
          <CiSettings className={styles.settingIcon} />
          <LuMailPlus className={styles.mailIcon} />
        </div>
      </div>

      <div>
        <div className={styles.userList}>
          {users.map((user) => (
            <EachUser key={user?._id} user={user} notification={notification}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
