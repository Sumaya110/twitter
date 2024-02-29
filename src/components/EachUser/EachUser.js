import styles from "@/components/EachUser/EachUser.module.css";
import {
  createConversation,
  getConversation,
} from "@/libs/action/conversationAction";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoMdAlert } from "react-icons/io";
import { useSocket } from "@/libs/Context/Context";

const EachUser = ({ user, notification }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [buttonClicked, setButtonClicked] = useState(false);
  const socket = useSocket();
  const [allMessages, setAllMessages] = useState([]);
  var hasNewMessages = false;

  const matchingNotification = notification?.find(
    (notif) =>
      notif?.lastMessage?.senderId === user?._id && !notif?.lastMessage?.seen
  );
  if (matchingNotification) hasNewMessages = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        {
          const data = await getConversation(matchingNotification?.roomId);
          setAllMessages(data?.messages);

          socket?.on("marked-as-seen", ({ conversationId, messageIds }) => {
            if (matchingNotification?.roomId === conversationId) {
              setButtonClicked(true);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (hasNewMessages) fetchData();
  }, [matchingNotification?.roomId, user?._id]);

  const handleSubmit = async () => {
    var conversationId = await createConversation({
      userOneId: session?.user?._id,
      userTwoId: user?._id,
      // messages: [],
    });
    if (conversationId) router.push(`/messages/${conversationId}`);
  };

  return (
    <div>
      <button
        className={`${styles.userInfo} ${
          hasNewMessages && styles.hasNewMessages
        }`}
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
        </div>
        <div>
          {hasNewMessages && !buttonClicked && (
            <IoMdAlert className={styles.alertIcon} />
          )}
        </div>
      </button>
    </div>
  );
};

export default EachUser;
