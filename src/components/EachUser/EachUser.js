import styles from "@/components/EachUser/EachUser.module.css";
import { createConversation } from "@/libs/action/conversationAction";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { checkConversationExists } from "@/libs/action/conversationAction";
import React, { useState } from "react";
import { useRouter } from "next/router";

let socket;

const EachUser = ({ user }) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const userOneId = session?.user?._id;
  const userTwoId = user?._id;
 
 

  const handleSubmit = async () => {
    const isExist = await checkConversationExists({
      userOneId, userTwoId
    });

    console.log("isExist : ", isExist)
    var conversationId=null;


    if(isExist) conversationId=isExist?._id;
    else
      conversationId = await createConversation({
      userOneId: session?.user?._id,
      userTwoId: user?._id,
      messages: [],
    });

    router.push(`/messages/${conversationId}`);
  };

  return (
    <div>
      <button className={styles.userInfo} onClick={() => handleSubmit()}>
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
        </div>
      </button>
    </div>
  );
};

export default EachUser;
