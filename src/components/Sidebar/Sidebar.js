import React, { useEffect, useState } from "react";
import styles from "@/components/Sidebar/Sidebar.module.css";
import { FaXTwitter } from "react-icons/fa6";
import SidebarLink from "../SidebarLink/SidebarLink";
import { BiHash } from "react-icons/bi";
import { BsBell, BsBookmark } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from "react-icons/ai";
import Image from "next/image";

import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { getUser } from "@/libs/action/userAction";

const Sidebar = ( {user, pic }) => {

  // const [pic, setPic] = useState(null)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const User = await getUser(user?.email);
  //       setPic(User?.profilePicture)
  //       console.log("user after from sidebar :", pic)
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();

  // }, [user])

  // if(!pic)
  //   return <div>loading...</div>

  return (
    <div className={styles.mainDiv}>
      <div className={styles.twitterIconContainer}>
        <FaXTwitter className={styles.twitterIcon} />
      </div>
      <div className={styles.sidebar}>
        <SidebarLink text="Home" Icon={AiFillHome} />
        <SidebarLink text="Explore" Icon={BiHash} />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink text="Messages" Icon={AiOutlineInbox} />
        <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        <SidebarLink text="Profile" Icon={AiOutlineUser} />
        <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>

      <button className={styles.tweetButton}>Post</button>

      <div className={styles.signOutDiv} >


        {user?.image ? (
          <Image
            src={user?.image}
            alt=""
            className={styles.userImage}
            width={40}
            height={40}
          />
        ) : (
          <Image
            src={pic}
            alt=""
            className={styles.userImage}
            width={40}
            height={40}
          />
        )}

        <div className={styles.userDetails}>
          <h4>{user?.name}</h4>
          <p>@{user?.tag}</p>
        </div>

        <BsThreeDots className={styles.dotsIcon} />
       
      </div>
      <button onClick={signOut} className={styles.signoutButton}> SignOut</button>

      


    </div>
  );
};

export default Sidebar;
