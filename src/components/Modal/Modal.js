import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/Modal/Modal.module.css";
import { useSession } from "next-auth/react";
import { MdClose } from "react-icons/md";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Moment from "react-moment";
import Image from "next/image";
import { createComment, updatePost } from "@/libs/action/postAction";


const Modal = ({ onClose, id, post, comment, option }) => {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const timestamp = new Date(post?.timestamp);

  const commentId= comment._id;


  const sendComment = async () => {
    const comment = ({
      userId: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      text: input,
      timestamp: new Date(),
    });



    if (option === 1) {
      await updatePost(id, {
        $push: { comments: comment }
      });
    }
    else {
      const updatedComments = post.comments.map((c) =>
        c._id === commentId
          ? {
            ...c,
            replies: [...c.replies, comment],
          }
          : c
      );

      await updatePost(id, {
        $set: {
          comments: updatedComments,
        },
      });

    };

  };

  const closeModal = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={styles.closeModal} onClick={closeModal}>
      <div
        className={styles.stopPropagation}
        onClick={(e) => e.stopPropagation()}
      >
        <MdClose className={styles.mdClose} onClick={closeModal} />

        <div className={styles.combined}>
          <div className={styles.padding}>
            <Image
              className={styles.imageStyle}
              src={post?.userImg}
              alt=""
              width={40}
              height={40}
            />
          </div>

          <div>
            <div className={styles.combined2}>
              <h1>{post?.username}</h1>
              <h2 className={styles.gray}>
                <Moment fromNow>{timestamp}</Moment>
              </h2>
            </div>
            <p className={styles.text}>{post?.text}</p>

            {post?.imageUrl && (
              <Image
                src={post?.imageUrl}
                className={styles.imageStyle2}
                alt="image"
                width={200}
                height={200}
              />
            )}

            <p className={styles.combined3}>
              Replying to:{" "}
              <span className={styles.textColor}>@{post?.tag}</span>
            </p>
          </div>

          <div className={styles.mt}>
            <Image
              className={styles.imageStyle}
              src={session?.user?.image}
              alt=""
              width={40}
              height={40}
            />
          </div>

          <div className={styles.mt}>
            <textarea
              className={styles.textAreaStyle}
              rows="4"
              placeholder="Post your reply"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className={styles.combined4}>
              <div className={styles.combined5}>
                <BsImage />

                <div className={styles.combined6}>
                  <AiOutlineGif />
                </div>
                <RiBarChart2Line className={styles.rotate90} />
                <BsEmojiSmile />
                <IoCalendarNumberOutline className={styles.combined7} />
                <HiOutlineLocationMarker className={styles.combined7} />
              </div>

              <button
                className={styles.combined8}
                disabled={!input.trim()}
                onClick={() => sendComment()}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
