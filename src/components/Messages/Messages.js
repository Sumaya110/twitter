import React, { useEffect, useState } from "react";
import styles from "@/components/Messages/Messages.module.css";
import { CiSettings } from "react-icons/ci";
import { LuMailPlus } from "react-icons/lu";
import { getUsers } from "@/libs/action/userAction";
import EachUser from "../EachUser/EachUser";
import io from "socket.io-client";
import { getConversations } from "@/libs/action/conversationAction";
import { useSocket } from "@/libs/Context/Context";

const Messages = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const socket = useSocket();
  const notifications = [];

  useEffect(() => {
    socketInitializer();

    fetchData();

    const socket = io();
    socket.on("notification", ({ lastMessage, roomId }) => {
      setNotification((prevNotifications) => [
        ...prevNotifications,
        { lastMessage, roomId },
      ]);

      notifications.push({ lastMessage, roomId });
    });
    fetchConversations();

    socket.on("disconnect", function () {});
  }, [user, socket]);

  const fetchData = async () => {
    try {
      const data = await getUsers();

      const filteredUsers = data.filter((u) => u._id !== user?._id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function socketInitializer() {
    if (!socket) return;
    socket.off("disconnect");

    socket.on("disconnect", function () {});
  }

  const fetchConversations = async () => {
    const allConversations = await getConversations();

    const notifications = [];

    allConversations?.forEach((conversation) => {
      const { messages } = conversation;
      const lastMessage = messages[messages?.length - 1];

      if (lastMessage?.receiverId === user?._id && !lastMessage?.seen) {
        notifications.push({ lastMessage, roomId: conversation?._id });
      }
    });

    setNotification(notifications);
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
            <EachUser key={user?._id} user={user} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
