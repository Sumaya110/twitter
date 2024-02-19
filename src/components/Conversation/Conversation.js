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

const Conversation = ({ user, conversation_id }) => {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(null);
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [notification, setNotification] = useState(false);
  const [conversation, setConversation] = useState();
  const [unreadMessagesCount, setUnreadMessagesCount] = useState({});
  const router = useRouter();
  const chatBoxRef = useRef(null);
  const socket = useSocket();
  const dispatch = useDispatch();

  const Notifications = useSelector(
    (state) => state.notifications.notifications
  );

  // console.log("notifications  : ", Notifications);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getConversation(conversation_id);
      // console.log("data  :: ", data);

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

      // if (
      //   senderId === user?._id &&
      //   data?.messages.some((message) => !message.seen)
      // ) {
      //   setNotification(true);
      // }

      const unreadCount = data.messages.filter(
        (message) => message.senderId === senderId && !message.seen
      ).length;
      setUnreadMessagesCount((prevState) => ({
        ...prevState,
        [senderId]: unreadCount,
      }));
    };
    fetchData();
  }, [socket, conversation_id, user, receiverId]);

  useEffect(() => {
    socketInitializer();
    markMessageSeen();

    return () => {
      if (socket) {
        socket.off("send");
        socket.off("receive");
      }
    };
  }, [socket, conversation_id, user, receiverId, allMessages]);

  const markMessageSeen = async () => {
    const unseenMessageIds = allMessages?.filter((message) => {
      return message.senderId === receiverId && !message.seen;
    });

    const messageIds = unseenMessageIds?.map((message) => message._id);
    if (messageIds?.length > 0) {
      await markSeen({ conversationId: conversation_id, messageIds });

      setNotification(false);

      socket?.emit("mark-as-seen", {
        conversationId: conversation_id,
        messageIds,
      });
    }
  };

  useEffect(() => {
    socket?.on("marked-as-seen", ({ conversationId, messageIds }) => {
      if (conversation_id === conversationId) {
        setAllMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen && message.senderId === user._id) {
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
  }, [socket, conversation_id, allMessages, user?._id]);

  useEffect(() => {
    scrollDown();
  }, [allMessages]);

  async function socketInitializer() {
    if (!socket) return;
    socket.off("send");
    socket.off("receive");
    socket.off("disconnect");
    socket.off("join-room");

    // socket.on("receive", (data) => {
    //   setAllMessages([...allMessages, data]);
    // });

    socket.on("receive", ({ lastMessage, roomId }) => {
      console.log("lastMessage  ::  ", lastMessage);
      if (roomId == conversation_id)
        setAllMessages((pre) => [...pre, lastMessage]);
      if (
        !Notifications?.some(
          (notification) => notification.roomId === conversation_id
        )
      ) {
        const updatedNotifications = [
          ...Notifications,
          {
            roomId: conversation_id,
            senderId: lastMessage?.senderId,
            message: lastMessage?.message,
          },
        ];
        dispatch({ type: "SET_NOTIFICATIONS", payload: updatedNotifications });
      }
      const lastMessageIsFromOtherUser = lastMessage?.senderId === receiverId;
      let messageIds = [];
      if (allMessages) messageIds.push(lastMessage?._id);
      if (lastMessageIsFromOtherUser) {
        setNotification(null);
        socket?.emit("mark-as-seen", {
          conversationId: conversation_id,
          messageIds,
        });
      }
    });

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
    socket.emit("join-room", { roomId: conversation_id });
  }

  function scrollDown() {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }

  const handleProfile = () => {
    router.push(`/profileId/${receiverId}`);
  };

  function handleSubmit() {
    socket.emit("send", {
      conversationId: conversation_id,
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
            <div className={styles.receiverName}>
              {receiver?.name}
              {unreadMessagesCount[receiverId] > 0 && (
                <span className={styles.notification}>
                  {unreadMessagesCount[receiverId]}
                </span>
              )}
            </div>

            {/* <div className={styles.receiverName}>{receiver?.name}</div> */}
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
          {/* {notification && <div className={styles.notification}>You have unread messages.</div>} */}
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
