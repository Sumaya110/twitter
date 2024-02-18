import React, { useEffect, useState } from "react";
import styles from "@/components/Profile/Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Trending from "../Trending/Trending";
import UserFeed from "../UserFeed/UserFeed";
import { getUser } from "@/libs/action/userAction";
import { setUsers } from "@/actions/actions";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ userId, feedUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const info = await getUser(userId);
      setUser(info);
    };
    fetchdata();
  }, []);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.fixed}>
            <Sidebar user={user} option={2} />
          </div>
          <div>
            <UserFeed user={feedUser} sessionUser={user} />
          </div>

          <div>
            <Trending user={user} option={2} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
