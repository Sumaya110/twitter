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
import { useSocket } from "@/libs/Context/Context";
import {
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import { getUser } from "@/libs/action/userAction";
import { setUsers } from "@/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import { getConversations } from "@/libs/action/conversationAction";

const Sidebar = ({ user, option }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const User = useSelector((state) => state.users.users);
  const { data: session } = useSession();
  const [notification, setNotification] = useState(null);
  const socket = useSocket();
  const notifications = [];

  useEffect(() => {
    socketInitializer();
    fetchData();

    const socket = io();
    socket.on("notification", ({ lastMessage, roomId }) => {
      if (lastMessage.receiverId === user?._id) setNotification(1);
      notifications.push({ lastMessage, roomId });
    });

    fetchConversations();

    return () => {
      if (socket) {
        socket.off("notification");
      }
    };
  }, [user, socket]);

  async function socketInitializer() {
    if (!socket) return;
    socket.off("disconnect");

    socket.on("disconnect", function () {});
  }
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

  const fetchConversations = async () => {
    const allConversations = await getConversations();

    allConversations?.forEach((conversation) => {
      const { messages } = conversation;
      const lastMessage = messages[messages?.length - 1];

      if (lastMessage?.receiverId === user?._id && !lastMessage?.seen) {
        notifications.push({ lastMessage, roomId: conversation?._id });
      }
    });

    setNotification(notifications?.length || null);
    socket?.on("marked-as-seen", ({ conversationId, messageIds }) => {
      const filteredNotifications = notifications.filter(
        (notification) => notification.roomId !== conversationId
      );
      setNotification(filteredNotifications?.length || null);
    });
  };

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
        <button
          className={styles.twitterIconContainer}
          onClick={() => handleHome()}
        >
          <FaXTwitter className={styles.twitterIcon} />
        </button>

        <button className={styles.profileButton} onClick={() => handleHome()}>
          <SidebarLink text="Home" Icon={AiFillHome} notification={null} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Explore" Icon={BiHash} notification={null} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Notifications" Icon={BsBell} notification={null} />
        </button>

        <button
          className={styles.profileButton}
          onClick={() => handleMessage()}
        >
          <SidebarLink
            text="Messages"
            Icon={AiOutlineInbox}
            notification={notification}
          />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink text="Bookmarks" Icon={BsBookmark} notification={null} />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink
            text="Lists"
            Icon={HiOutlineClipboardList}
            notification={null}
          />
        </button>

        <button
          className={styles.profileButton}
          onClick={() => handleEditProfile()}
        >
          <SidebarLink
            text="Profile"
            Icon={AiOutlineUser}
            notification={null}
          />
        </button>

        <button className={styles.profileButton}>
          <SidebarLink
            text="More"
            Icon={HiOutlineDotsCircleHorizontal}
            notification={null}
          />
        </button>
      </div>

      <button className={styles.tweetButton}>Post</button>

      {option === 2 && (
        <div className={styles.signOutDiv} onClick={() => signOut()}>
          <Image
            src={User?.profilePicture || "/images/blank-profile-picture.webp"}
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
      )}

      {option === 1 && (
        <div className={styles.signOutDiv} onClick={() => signOut()}>
          <Image
            src={user?.profilePicture || "/images/blank-profile-picture.webp"}
            alt=""
            className={styles.userImage}
            width={40}
            height={40}
          />

          <div className={styles.userDetails}>
            <h4>{user?.name}</h4>
            <p>@{user?.username}</p>
          </div>

          <BsThreeDots className={styles.dotsIcon} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;