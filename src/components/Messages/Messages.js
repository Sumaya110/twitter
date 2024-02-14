import React, { useEffect, useState } from "react";
import styles from "@/components/Messages/Messages.module.css";
import { CiSettings } from "react-icons/ci";
import { LuMailPlus } from "react-icons/lu";
import { getUsers } from "@/libs/action/userAction";
import EachUser from "../EachUser/EachUser";

const Messages = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const data = await getUsers();

      const filteredUsers = data.filter((u) => u._id !== user?._id);
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
            <EachUser key={user?._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
