import styles from "@/components/EachUser/EachUser.module.css";
import { createConversation } from "@/libs/services/conversation-service";
import { useSession } from "next-auth/react";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const EachUser = ({ user }) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    socketInitializer();

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      // we get the data here
    });
  }


  function handleSubmit() {
    const  conversationId= await createConversation({
      senderId: session?.user?._id,
      receiverId: user?._id,
      timestamp: new Date()
    })
  }

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

      {/* <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div> */}
    </div>
  );
};

export default EachUser;
