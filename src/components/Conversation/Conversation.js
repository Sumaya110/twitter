import styles from "@/components/Conversation/Conversation.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSocket } from "@/libs/Context/Context";
import { getConversation, markSeen } from "@/libs/action/conversationAction";
import { getUser } from "@/libs/action/userAction";
import React, { useRef } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { BsCheck2All } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";

const Conversation = ({ user, conversation_id }) => {
  const [message, setMessage] = useState(null);
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const router = useRouter();
  const chatBoxRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    fetchData();
    scrollDown();
    socketInitializer();
    MessageSeen();
    socketOff();
  }, [socket, conversation_id, user, receiverId]);

  useEffect(() => {
    scrollDown();
    socketInitializer();
    MessageSeen();
    socketOff();
  }, [ allMessages]);

  const socketOff = async () => {
    return () => {
      if (socket) {
        socket.off("send");
        socket.off("receive");
      }
    };
  };

  const MessageSeen = async () => {
    const unseenMessageIds = allMessages?.filter((message) => {
      return message.senderId === receiverId && !message.seen;
    });

    const messageIds = unseenMessageIds?.map((message) => message._id);
    if (messageIds?.length > 0) {
      await markSeen({ conversationId: conversation_id, messageIds });

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


  async function socketInitializer() {
    if (!socket) return;
    socket.off("send");
    socket.off("receive");
    socket.off("disconnect");

    socket.on("receive", ({ lastMessage, roomId }) => {
      if (roomId == conversation_id)
        setAllMessages((pre) => [...pre, lastMessage]);

      const lastMessageIsFromOtherUser = lastMessage?.senderId === receiverId;
      let messageIds = [];
      if (allMessages) messageIds.push(lastMessage?._id);
      if (lastMessageIsFromOtherUser) {
        socket?.emit("mark-as-seen", {
          conversationId: conversation_id,
          messageIds,
        });
      }
    });

    socket.on("disconnect", function () {});
  }

  const fetchData = async () => {
    const data = await getConversation(conversation_id);

    const userOneId = data?.userOneId;
    const userTwoId = data?.userTwoId;
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
            value={message || ""}
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
