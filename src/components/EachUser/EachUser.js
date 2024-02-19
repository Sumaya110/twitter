import styles from "@/components/EachUser/EachUser.module.css";
import { createConversation } from "@/libs/action/conversationAction";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { IoMdAlert } from "react-icons/io";

const EachUser = ({ user, notification }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const hasNewMessages = notification?.some(
    (notif) => notif.lastMessage.senderId === user._id
  );

  const handleSubmit = async () => {
    var conversationId = await createConversation({
      userOneId: session?.user?._id,
      userTwoId: user?._id,
      messages: [],
    });

    if (conversationId) router.push(`/messages/${conversationId}`);
  };

  return (
    <div>
     

      <button
        className={`${styles.userInfo} ${hasNewMessages && styles.hasNewMessages}`}
        onClick={() => handleSubmit()}
      >
        <Image
          src={user?.profilePicture || "/images/blank-profile-picture.webp"}
          alt="Profile"
          className={styles.profilePicture}
          width={40}
          height={40}
        />
        <div className={styles.details}>
          <h3 className={styles.name}>{user?.name}</h3>
          <p className={styles.username}> @{user?.username}</p>
         
          {hasNewMessages && <IoMdAlert className={styles.alertIcon} />}
        </div>
      </button>

     
    </div>
  );
};

export default EachUser;
