import React from "react";
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

const Sidebar = () => {
  const { data: session } = useSession();

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

      <div className={styles.signOutDiv} onClick={signOut}>
        {/* <Image
          src={session?.user?.image}
          alt=""
          className={styles.userImage}
          width={100}
          height={100}
        /> */}

        {session?.user?.image ? (
          <Image
            // className={styles.combined10}
            src={session?.user?.image}
            alt=""
            className={styles.userImage}
            width={100}
            height={100}
          />
        ) : (
          // Render a placeholder or alternative content if the image is not available
          <div>No image available</div>
        )}

        <div className={styles.userDetails}>
          <h4>{session?.user?.name}</h4>
          <p>@{session?.user?.tag}</p>
        </div>

        <BsThreeDots className={styles.dotsIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
