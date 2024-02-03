import React from "react";
import styles from "@/components/Profile/Profile.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Trending from "../Trending/Trending";
import UserFeed from "../UserFeed/UserFeed";

const Profile = ({profileId, profileData}) => {

    console.log("profile id  : ", profileData)
    
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar user={profileData} pic={profileData.profilePicture} />
        </div>

        <div className={styles.container}>
          <UserFeed user={profileData} pic={profileData.profilePicture} />
          <Trending />
        </div>
      </main>
     
    </div>
  );
};

export default Profile;
