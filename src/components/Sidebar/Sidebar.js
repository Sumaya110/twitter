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
import { getUser } from "@/libs/action/userAction";
import { setUsers } from "@/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const Sidebar = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const User = useSelector((state) => state.users.users);
  const { data: session } = useSession();


  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?._id) {
        try {
          const userInfo = await getUser(session?.user?._id);
          dispatch(setUsers(userInfo));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchData();
  }, [dispatch, session]);

  const handleEditProfile = async () => {
    router.push(`/profileId/${session?.user?._id}`);
  };

  const handleHome = async () => {
    router.push("/home");
  };

  const handleMessage = async () => {
    router.push("/messages");
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.sidebar}>
        <div className={styles.twitterIconContainer}>
          <FaXTwitter className={styles.twitterIcon} />
        </div>

        <button className={styles.profileButton} onClick={() => handleHome()}>
          <SidebarLink text="Home" Icon={AiFillHome} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Explore" Icon={BiHash} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Notifications" Icon={BsBell} />
        </button>

        <button className={styles.profileButton} onClick={() => handleMessage()} >
          <SidebarLink text="Messages" Icon={AiOutlineInbox} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        </button>

        <button
          className={styles.profileButton}
          onClick={() => handleEditProfile()}
        >
          <SidebarLink text="Profile" Icon={AiOutlineUser} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
        </button>
      </div>

      <button className={styles.tweetButton}>Post</button>

      <div className={styles.signOutDiv} onClick={() => signOut()}>
        
          <Image
            src={User?.profilePicture || '/images/blank-profile-picture.webp'}
            alt=""
            className={styles.userImage}
            width={40}
            height={40}
          />
       

        <div className={styles.userDetails}>
          <h4>{User?.name}</h4>
          <p>@{User?.username}</p>
        </div>

        <BsThreeDots className={styles.dotsIcon} />
      </div>
    </div>
  );
};

export default Sidebar;
