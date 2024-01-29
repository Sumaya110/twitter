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
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { updatePost } from "@/libs/action/postAction";

const Modal = ({ onClose, id, post }) => {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const timestamp = new Date(post?.timestamp);
  const [showEmojis, setShowEmojis] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const addImageToPost = (e) => {
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

  const updatePostButton = async () => {
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
        userId: session.user.uid,
        username: session.user.name,
        userImg: session.user.image,
        tag: session.user.tag,
        imageUrl: url,
        text: input,
        timestamp: new Date(),
      };

      console.log("comment Reply:  ", commentReply);
    } else {
      commentReply = {
        userId: session.user.uid,
        username: session.user.name,
        userImg: session.user.image,
        tag: session.user.tag,
        text: input,
        timestamp: new Date(),
      };
    }

      await updatePost(id, {
        $push: { comments: commentReply },
      });
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

            <form onSubmit={() => handleSubmit()}>
              <div className={styles.formSubmit}>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={
                    post.imageUrl
                      ? `${post.text} || ${post.imageUrl}`
                      : post.text
                  }
                  onChange={(e) => {
                    const newValue = e.target.value.split(" || ");
                    setTitle(newValue[0]);
                    setImageUrl(newValue[1] || "");
                  }}
                  required
                />
              </div>
              <button type="submit">Update Task</button>
            </form>

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
            </div>
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
            
              value={post.text}
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
                  width={500}
                  height={500}
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
                  onChange={addImageToPost}
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
                }}
              >
                Update
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
