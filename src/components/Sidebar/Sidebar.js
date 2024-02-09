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
import { signOut} from "next-auth/react";
import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";


const Sidebar = ({ user, pic}) => {
  const router = useRouter();
  const profileId= user._id;

  const handleEditProfile = async() => {
    router.push(`/profileId/${profileId}`);
  };

  const handleHome = async() => {
    router.push("/home")
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.twitterIconContainer}>
        <FaXTwitter className={styles.twitterIcon} />
      </div>
      <div className={styles.sidebar}>

      <button className={styles.profileButton} onClick={handleHome}>
      <SidebarLink text="Home" Icon={AiFillHome} />
        </button>
        
        <SidebarLink text="Explore" Icon={BiHash} />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink text="Messages" Icon={AiOutlineInbox} />
        <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />

        <button className={styles.profileButton} onClick={handleEditProfile}>
          <SidebarLink text="Profile" Icon={AiOutlineUser} />
        </button>

        <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
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
            src={user.blankPicture}
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
