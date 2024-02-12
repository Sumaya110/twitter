import React, { useEffect, useState } from "react";
import styles from "@/components/Profile/Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Trending from "../Trending/Trending";
import UserFeed from "../UserFeed/UserFeed";
import { getUser } from "@/libs/action/userAction";
import { setUsers } from "@/actions/actions";
import { useDispatch, useSelector } from 'react-redux';

const Profile = ({ user_email, feedUser }) => {
  const [user, setUser] = useState(null)
  // const user = useSelector((state) => state.users.users);
  // const dispatch = useDispatch();

  console.log("user from profile  :: ", feedUser)

  useEffect(() => {
    const fetchdata = async () => {
      const info = await getUser(user_email)
      setUser(info)
    }
    fetchdata();
  }, [])

  // useEffect(()=>{
  //   const fetchdata = async () => {
  //     const info = await getUser(user_email);

  //     console.log("infoo : ", info)
  //     dispatch(setUsers(info));
     
  //   };
  //   fetchdata();

  // }, [user])



  return (
    <div>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar  user={user} />
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
