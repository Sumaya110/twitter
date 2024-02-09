import React from "react";
import styles from "@/components/Profile/Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Trending from "../Trending/Trending";
import UserFeed from "../UserFeed/UserFeed";

const Profile = ({profileId, profileData, user}) => {
  // const users = useSelector((state) => state.users.users);

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar user={profileData} pic={profileData.profilePicture} />
        </div>

        <div className={styles.container}>
          <UserFeed user={profileData} pic={profileData.profilePicture} />
          <Trending  user={profileData} />
        </div>
      </main>
     
    </div>
  );
};

export default Profile;
