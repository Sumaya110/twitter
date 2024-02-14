import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/Modal/Modal.module.css";
import { MdClose } from "react-icons/md";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Moment from "react-moment";
import Image from "next/image";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { getPosts, updatePost } from "@/libs/action/postAction";
import { setPosts } from "@/actions/actions";
import { useDispatch } from "react-redux";
import { getUser } from "@/libs/action/userAction";

const Modal = ({ onClose, id, post, comment, user, option }) => {
  const [input, setInput] = useState("");
  const timestamp = new Date(post?.timestamp);
  const [showEmojis, setShowEmojis] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [postUser, setPostUser] = useState(null);
  const [commentUser, setCommentUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      if (post?.userId) {
        const info = await getUser(post?.userId);
        setPostUser(info);
      }
    };
    fetchdata();
  }, [post]);

  useEffect(() => {
    const fetchdata = async () => {
      if (comment?.userId) {
        const info = await getUser(comment?.userId);
        setCommentUser(info);
      }
    };
    fetchdata();
  }, [comment]);

  const addImageToCommentReply = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      const i = e.target.files[0];
      setImage(i);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendComment = async () => {
    let commentReply;

    if (selectedFile) {
      const body = new FormData();
      body.append("file", image);
      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const url = await response.json();
      commentReply = {
        userId: user?._id,
        username: user?.name,
        userImg: user?.profilePicture,
        userEmail: user?.email,
        tag: user?.username,
        imageUrl: url,
        text: input,
        timestamp: new Date(),
      };
    } else {
      commentReply = {
        userId: user?._id,
        username: user?.name,
        userImg: user?.profilePicture,
        userEmail: user?.email,
        tag: user?.username,
        text: input,
        timestamp: new Date(),
      };
    }

    if (option === 1) {
      await updatePost(id, {
        $push: { comments: commentReply },
      });

      const data = await getPosts(user._id);
      dispatch(setPosts(data));
    } else {
      const commentId = comment._id;
      const updatedComments = post.comments.map((c) =>
        c._id === commentId
          ? {
            ...c,
            replies: [...c.replies, commentReply],
          }
          : c
      );

      await updatePost(id, {
        $set: {
          comments: updatedComments,
        },
      });

      const data = await getPosts(user._id);
      dispatch(setPosts(data));
    }
  };

  const closeModal = () => {
    onClose();
  };

  const modalContent = (
    <div
      className={styles.closeModal}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      <div
        className={styles.stopPropagation}
        onClick={(e) => e.stopPropagation()}
      >
        <MdClose className={styles.mdClose} onClick={() => closeModal()} />

        <div className={styles.combined}>
          <div className={styles.padding}>
            {option === 1 && (
              <div>
                {postUser?.profilePicture ? (
                  <Image
                    className={styles.imageStyle}
                    src={postUser?.profilePicture}
                    alt=""
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    className={styles.imageStyle}
                    src={postUser?.blankPicture}
                    alt=""
                    width={40}
                    height={40}
                  />
                )}
              </div>
            )}

            {option === 2 && (
              <div>
                {commentUser?.profilePicture ? (
                  <Image
                    className={styles.imageStyle}
                    src={commentUser?.profilePicture}
                    alt=""
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    className={styles.imageStyle}
                    src={commentUser?.blankPicture}
                    alt=""
                    width={40}
                    height={40}
                  />
                )}
              </div>
            )}
          </div>

          <div>
            <div className={styles.combined2}>
              <h1>{post?.username}</h1>
              <h2 className={styles.gray}>
                <Moment fromNow>{timestamp}</Moment>
              </h2>
            </div>

            {option === 1 && (
              <div>
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
            )}
            {option === 2 && (
              <div>
                <p className={styles.text}>{comment?.text}</p>

                {comment?.imageUrl && (
                  <Image
                    src={comment?.imageUrl}
                    className={styles.imageStyle2}
                    alt="image"
                    width={200}
                    height={200}
                  />
                )}

                <p className={styles.combined3}>
                  Replying to:{" "}
                  <span className={styles.textColor}>@{comment?.tag}</span>
                </p>
              </div>
            )}
          </div>

          <div className={styles.mt}>
            {user?.profilePicture ? (
              <Image
                className={styles.imageStyle}
                src={user?.profilePicture}
                alt=""
                width={40}
                height={40}
              />
            ) : (
              <Image
                className={styles.imageStyle}
                src={user?.blankPicture}
                alt=""
                width={40}
                height={40}
              />
            )}
          </div>

          <div className={styles.mt}>
            <textarea
              className={styles.textAreaStyle}
              rows="4"
              placeholder="Post your reply"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {selectedFile && (
              <div className={styles.modal2}>
                <div
                  className={styles.modal3}
                  onClick={() => setSelectedFile(null)}
                >
                  <AiOutlineClose className={styles.modal4} />
                </div>
                <Image
                  src={selectedFile}
                  alt=""
                  width={200}
                  height={200}
                  className={styles.modal5}
                />
              </div>
            )}

            <div className={styles.combined4}>
              <div className={styles.combined12}>
                <label htmlFor="comment">
                  <BsImage className={styles.clickable} />
                </label>

                <input
                  id="comment"
                  type="file"
                  hidden
                  onChange={addImageToCommentReply}
                />

                <div className={styles.combined13}>
                  <AiOutlineGif />
                </div>

                <RiBarChart2Line className={styles.rotatedCw} />
                <BsEmojiSmile
                  className={styles.clickable}
                  onClick={() => setShowEmojis(!showEmojis)}
                />

                <IoCalendarNumberOutline />
                <HiOutlineLocationMarker />
              </div>

              <button
                className={styles.combined8}
                disabled={!input.trim() && !selectedFile}
                onClick={(e) => {
                  e.stopPropagation();
                  sendComment();
                  closeModal();
                }}
              >
                Reply
              </button>

              {showEmojis && (
                <div className={styles.combinedInput}>
                  <Picker onEmojiSelect={addEmoji} data={data} />
                </div>
              )}
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
