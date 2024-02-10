import React, { useEffect, useState } from "react";
import styles from "@/components/Sidebar/Sidebar.module.css";
import { FaXTwitter } from "react-icons/fa6";
import SidebarLink from "../SidebarLink/SidebarLink";
import { BiHash } from "react-icons/bi";
import { BsBell, BsBookmark } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";


const Sidebar = ({ user }) => {
  const router = useRouter();
  console.log("userrr :: ", user)


  const profileId = user?._id;



  const handleEditProfile = async () => {
    router.push(`/profileId/${profileId}`);
  };

  const handleHome = async () => {
    router.push("/home")
  }

  return (
    <div className={styles.mainDiv}>
     
      <div className={styles.sidebar}>
        
      <div className={styles.twitterIconContainer}>
        <FaXTwitter className={styles.twitterIcon} />
      </div>

        <button className={styles.profileButton} onClick={handleHome}>
          <SidebarLink text="Home" Icon={AiFillHome} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Explore" Icon={BiHash} />
        </button>

       
        <button className={styles.profileButton}>
          <SidebarLink text="Notifications" Icon={BsBell} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Messages" Icon={AiOutlineInbox} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        </button>

        <button className={styles.profileButton} onClick={handleEditProfile}>
          <SidebarLink text="Profile" Icon={AiOutlineUser} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
        </button>

      </div>

      <button className={styles.tweetButton}>Post</button>

      <div className={styles.signOutDiv}>
        {user?.profilePicture ? (
          <Image
            src={user?.profilePicture}
            alt=""
            className={styles.userImage}
            width={40}
            height={40}
          />
        ) : (
          <Image
            src={user?.blankPicture}
            alt=""
            className={styles.userImage}
            width={40}
            height={40}
          />
        )}

        <div className={styles.userDetails}>
          <h4>{user?.name}</h4>
          <p>@{user?.username}</p>
        </div>

        <BsThreeDots className={styles.dotsIcon} />
      </div>
      <button onClick={signOut} className={styles.signoutButton}>
        {" "}
        SignOut
      </button>
    </div>
  );
};

export default Sidebar;
