import React from 'react'
import styles from "@/components/Sidebar/Sidebar.module.css"
import { FaXTwitter } from "react-icons/fa6";
import SidebarLink from '../SidebarLink/SidebarLink';
import { BiHash } from "react-icons/bi"
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from "react-icons/bs"
import { AiFillHome, AiOutlineInbox, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineClipboardList, HiOutlineDotsCircleHorizontal } from "react-icons/hi"
import { signOut, useSession } from 'next-auth/react'

const Sidebar = () => {

  const {data: session} = useSession()

  return (
    <div className={styles.mainDiv}>
      <div className={styles.twitterIconContainer}>
        <FaXTwitter className={styles.twitterIcon} />
      </div>

      <div className={styles.Sidebar}>
        <SidebarLink text="Home" Icon={AiFillHome} />
        <SidebarLink text="Explore" Icon={BiHash} />
        <SidebarLink text="Notifications" Icon={BsBell} />
        <SidebarLink text="Messages" Icon={AiOutlineInbox} />
        <SidebarLink text="Bookmarks" Icon={BsBookmark} />
        <SidebarLink text="Lists" Icon={HiOutlineClipboardList} />
        <SidebarLink text="Profile" Icon={AiOutlineUser} />
        <SidebarLink text="More" Icon={HiOutlineDotsCircleHorizontal} />
      </div>

      <button class="tweetButton">Tweet</button>

      <div class="signOutDiv" onClick={signOut}>
        <img
          src={session?.user?.image}
          alt=""
          class="userImage"
        />
        <div class="userDetails">
          <h4>{session?.user?.name}</h4>
          <p>@{session?.user?.tag}</p>
        </div>
        <BsThreeDots class="dotsIcon" />

      </div>


    </div>
  )
}

export default Sidebar