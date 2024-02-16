import React, { useState } from "react";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Image from "next/image";
import styles from "@/components/Input/Input.module.css";
import { createPost, getPosts, updatePost } from "@/libs/action/postAction";
import moment from "moment";
import { setPosts } from "@/actions/actions";
import { useDispatch } from "react-redux";

const Input = ({ user }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formattedTimestamp, setFormattedTimestamp] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

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

  const sendPost = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const postId = await createPost({
        userId: user?._id,
        userEmail: user?.email,
        userImage: user?.profilePicture,
        username: user?.username,
        text: input,
      });

      const data = await getPosts(user._id);
      dispatch(setPosts(data));

      setFormattedTimestamp(moment(new Date()).fromNow());

      if (selectedFile) {
        const body = new FormData();
        body.append("file", image);

        const response = await fetch("/api/upload", {
          method: "POST",
          body,
        });

        const url = await response.json();

        updatePostImage(postId, url);

        const data = await getPosts(user._id);
        dispatch(setPosts(data));
      }
    } catch (error) {
      console.error("Error sending post:", error);
    } finally {
      setLoading(false);
      setInput("");
      setSelectedFile(null);
      setShowEmojis(false);
    }
  };

  const updatePostImage = async (postId, imageUrl) => {
    await updatePost(postId, { imageUrl: imageUrl });
    const data = await getPosts(user._id);
    dispatch(setPosts(data));
  };

  return (
    <div className={styles.combined8}>
      <div className={styles.combined9}>
        <div>
          <Image
            className={styles.combined10}
            src={user?.profilePicture || "/images/blank-profile-picture.webp"}
            alt=""
            width={40}
            height={40}
          />
        </div>

        <div className={styles.combined7}>
          <textarea
            className={styles.combined6}
            rows="3"
            placeholder="What is happening?!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {selectedFile && (
            <div className={styles.combined2}>
              <div
                className={styles.combined3}
                onClick={() => setSelectedFile(null)}
              >
                <AiOutlineClose className={styles.combined4} />
              </div>
              <Image
                src={selectedFile}
                alt=""
                width={500}
                height={500}
                className={styles.combined5}
              />
            </div>
          )}

          {!loading && (
            <div className={styles.combined11}>
              <div className={styles.combined12}>
                <label htmlFor="file">
                  <BsImage className={styles.clickable} />
                </label>

                <input id="file" type="file" hidden onChange={addImageToPost} />

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
                className={styles.combined14}
                disabled={!input.trim() && !selectedFile}
                onClick={(e) => {
                  e.stopPropagation();
                  sendPost();
                }}
              >
                Post
              </button>
            </div>
          )}

          {showEmojis && (
            <div className={styles.combined}>
              <Picker onEmojiSelect={addEmoji} data={data} />
            </div>
          )}
        </div>
      </div>

      {formattedTimestamp && (
        <div className={styles.timestamp}>{formattedTimestamp}</div>
      )}
    </div>
  );
};

export default Input;
