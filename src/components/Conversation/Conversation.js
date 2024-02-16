import styles from "@/components/Conversation/Conversation.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSocket } from "@/libs/Context/Context";
import { getConversation } from "@/libs/action/conversationAction";
import { getUser } from "@/libs/action/userAction";
import React, { useRef } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { BsCheck2All } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Conversation = ({ user, conversationId }) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [allMessages, setAllMessages] = useState(null);
  const [notification, setNotification] = useState(1);
  const router = useRouter();
  //   const Notifications = useSelector((state) => state.notifications)
  // const dispatch = useDispatch();
  const chatBoxRef = useRef(null);

  const socket = useSocket();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversation(conversationId);

      const userOneId = data.userOneId;
      const userTwoId = data.userTwoId;
      const senderId = userOneId === user?._id ? userOneId : userTwoId;
      const receiverId = userOneId === user?._id ? userTwoId : userOneId;

      const senderInfo = await getUser(senderId);
      const receiverInfo = await getUser(receiverId);

      setSender(senderInfo);
      setReceiver(receiverInfo);

      setSenderId(senderId);
      setReceiverId(receiverId);
    };
    fetchData();
  }, [conversationId]);

  useEffect(() => {
    socketInitializer();

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    scrollDown();
  }, [allMessages]);

  async function socketInitializer() {
    // socket = io();
    if (!socket) return;

    socket.on("receive-message", (data) => {});
  }

  function scrollDown() {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }

  const handleProfile = () => {
    router.push(`/profileId/${receiver?._id}`);
  };

  function handleSubmit() {
    socket.emit("send-message", {
      conversation: conversationId,
      senderId,
      receiverId,
      message,
    });

    setMessage("");
  }

  return (
    <section className={styles.container}>
      <div className={styles.receiverContainer}>
        <div className={styles.receiver}>
          <img src={receiver?.profilePicture} />
          <button
            className={styles.buttonDesign}
            onClick={() => handleProfile()}
          >
            <div className={styles.receiverName}>{receiver?.name}</div>
          </button>

          <div className={styles.username}>@{receiver?.username}</div>
        </div>
      </div>

      <div>
        <div className={styles.chatBox} ref={chatBoxRef}>
          {allMessages?.map((message, index) => (
            <div className={styles.conversation} key={index}>
              <div
                className={
                  styles[
                    message?.sender_id === receiver?._id
                      ? "receive-message"
                      : "send-message"
                  ]
                }
              >
                {message?.message}
                {message?.seen && message?.sender_id === user?._id && (
                  <span className={styles["checked"]}>
                    {" "}
                    <BsCheck2All />
                  </span>
                )}
                {!message?.seen && message?.sender_id === user?._id && (
                  <span className={styles["check"]}>
                    {" "}
                    <BsCheck2All />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.sendButton}>
          <input
            className={styles.input}
            name="message"
            placeholder="Start a new message"
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Fixed the error here
            autoComplete={"off"}
          />

          <button
            className={styles.button}
            onClick={() => handleSubmit()}
            disabled={!message}
          >
            <LuSendHorizonal />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Conversation;
