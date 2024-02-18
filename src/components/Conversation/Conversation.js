import styles from "@/components/Conversation/Conversation.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSocket } from "@/libs/Context/Context";
import { getConversation, markSeen } from "@/libs/action/conversationAction";
import { getUser } from "@/libs/action/userAction";
import React, { useRef } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { BsCheck2All } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

const Conversation = ({ user, conversationId }) => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [notification, setNotification] = useState(1);
  const [conversation, setConversation] = useState();
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

      setAllMessages(data?.messages);
      const senderInfo = await getUser(senderId);
      const receiverInfo = await getUser(receiverId);

      setSender(senderInfo);
      setReceiver(receiverInfo);

      setSenderId(senderId);
      setReceiverId(receiverId);
    };
    fetchData();
  }, [socket, conversationId, user, receiverId]);

  useEffect(() => {
    socketInitializer();
    markMessagesAsSeen();

    return () => {
      if (socket) {
        socket.off("send");
        socket.off("receive");
      }
    };
  }, [socket, conversationId, user, receiverId]);

  const markMessagesAsSeen = async () => {
    const unseenMessageIds = allMessages?.filter((message) => {
      return message.senderId === receiverId && !message.seen;
    });

    const messageIds = unseenMessageIds?.map((message) => message._id);
    if (messageIds?.length > 0) {
      await markSeen({ conversationId, messageIds });

      setNotification(null);

      socket?.emit("mark-as-seen", {
        conversationId,
        messageIds,
      });
    }
  };


  useEffect(() => {
    socket?.on("marked-as-seen", ({ conversationId, messageIds }) => {
      if (conversationId === conversationId) {
        setAllMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen && message.senderId === user._id) {
              // const updatedNotifications = Notifications.filter(
              //   (notification) => notification.roomId !== conversation?._id
              // );
              // console.log(updatedNotifications);
              // dispatch({
              //   type: "SET_NOTIFICATIONS",
              //   payload: updatedNotifications,
              // });
              return {
                ...message,
                seen: true,
              };
            }
            return message;
          });
          return updatedMessages;
        });
      }
    });
  }, [socket, conversationId, allMessages, user?._id]);

  useEffect(() => {
    scrollDown();
  }, [allMessages]);

  async function socketInitializer() {
    // socket = io();
    if (!socket) return;
    socket.off("send");
    socket.off("receive");

    socket.on("receive", (data) => {
      setAllMessages([...allMessages, data]);
    });
  }

  function scrollDown() {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }

  const handleProfile = () => {
    router.push(`/profileId/${receiver?._id}`);
  };

  function handleSubmit() {
    socket.emit("send", {
      conversationId,
      senderId,
      receiverId,
      text: message,
    });

    setMessage("");
  }

  return (
    <section className={styles.container}>
      <div className={styles.receiverContainer}>
        <div className={styles.receiver}>
          <Image
            className={styles.image}
            src={
              receiver?.profilePicture || "/images/blank-profile-picture.webp"
            }
            alt={`${receiver?.profilePicture}'s avatar`}
            width={40}
            height={40}
          />
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
                  styles[message?.senderId === receiverId ? "receive" : "send"]
                }
              >
                {message?.text}
                {message?.seen && message?.senderId === user?._id && (
                  <span className={styles.checked}>
                    {" "}
                    <BsCheck2All />
                  </span>
                )}
                {!message?.seen && message?.senderId === user?._id && (
                  <span className={styles.check}>
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
            onChange={(e) => setMessage(e.target.value)}
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
