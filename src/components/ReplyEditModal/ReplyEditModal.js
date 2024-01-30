import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/ReplyEditModal/ReplyEditModal.module.css";
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

const Modal = ({
  onClose,
  postId,
  commentId,
  replyId,
  post,
  comment,
  reply,
}) => {
  const [input, setInput] = useState(reply.text);
  const timestamp = new Date(reply?.timestamp);
  const [showEmojis, setShowEmojis] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(reply.imageUrl);

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
    const commentToUpdate = post.comments.find(
      (comment) => comment._id === commentId
    );
    const replyToUpdate = commentToUpdate.replies.find(
      (reply) => reply._id === replyId
    );
    replyToUpdate.text = input;
    
   

    if (selectedFile === reply.imageUrl) {
        await updatePost(postId, { comments: post.comments });
    } else {
      let url = null;
      if (selectedFile) {
        const body = new FormData();
        body.append("file", image);
        const response = await fetch("/api/upload", {
          method: "POST",
          body,
        });

        url = await response.json();

        replyToUpdate.imageUrl = url;
        
      }


      await updatePost(postId, { comments: post.comments });

    }
  };

  const closeModal = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = (
    <div className={styles.closeModal}>
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
              priority={true}
            />
          </div>

          <div>
            <div className={styles.combined2}>
              <h1>{post?.username}</h1>
              <h2 className={styles.gray}>
                <Moment fromNow>{timestamp}</Moment>
              </h2>
            </div>
          </div>

          <div className={styles.mt}>
            <textarea
              className={styles.textAreaStyle}
              rows="4"
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
                  width={300}
                  height={300}
                  className={styles.modal5}
                  priority={true}
                />
              </div>
            )}

            <div className={styles.combined4}>
              <div className={styles.combined12}>
                <label htmlFor="edit">
                  <BsImage className={styles.clickable} />
                </label>

                <input id="edit" type="file" hidden onChange={addImageToPost} />

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
                disabled={(input===reply.text && selectedFile===reply.imageUrl) ||
                    (!input.trim() && !selectedFile)}
                onClick={(e) => {
                  e.stopPropagation();
                  updatePostButton();
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