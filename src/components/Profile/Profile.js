import React, { useEffect, useState } from "react";
import styles from "@/components/Profile/Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Trending from "../Trending/Trending";
import UserFeed from "../UserFeed/UserFeed";
import { getUser } from "@/libs/action/userAction";

const Profile = ({ user_email, feedUser }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchdata = async () => {
      const info = await getUser(user_email)
      setUser(info)
    }
    fetchdata();
  }, [])


  return (
    <div>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar user={user} />
        </div>

        <div className={styles.container}>
          <UserFeed user={feedUser} sessionUser={user} />
          <Trending user={user} option={2} />
        </div>
      </main>

    </div>
  );
};

export default Profile;
