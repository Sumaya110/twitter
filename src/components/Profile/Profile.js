import React, { useEffect, useState } from "react";
import styles from "@/components/Profile/Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Trending from "../Trending/Trending";
import UserFeed from "../UserFeed/UserFeed";
import { getUser } from "@/libs/action/userAction";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Login from "../Login/Login";



const Profile = ({ userId, feedUser }) => {
  const [user, setUser] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchdata = async () => {
      if(userId)
      {const info = await getUser(userId);
      setUser(info);}
    };
    fetchdata();
  }, []);

 

  useEffect(() => {
    const replace = async () => {
      if (!userId) {
        await router.replace("/");
      }
    };

    replace();
  }, [userId, router]);

  return (
    <div>
      {userId ? (
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
       ) : (
        <Login />
      )}
    </div>
  );
};

export default Profile;
