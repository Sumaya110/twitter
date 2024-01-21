import React, { useState } from "react";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSession } from "next-auth/react";
import Picker from "@emoji-mart/react";
import Image from "next/image";
import styles from "@/components/Input/Input.module.css";
import { createPost } from "@/libs/action/postAction";
// import { uploadImage } from "@/libs/action/imageAction"; // Import your image upload function
import moment from "moment"; // Import the moment library

const Input = () => {
  const { data: session } = useSession();

  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formattedTimestamp, setFormattedTimestamp] = useState(null);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
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
        userId: session.user.uid,
        username: session.user.name,
        userImg: session.user.image,
        tag: session.user.tag,
        text: input,
        timestamp: new Date(),
      });

      setFormattedTimestamp(moment(new Date()).fromNow());

      // console.log("post Id ", postId);

      if (selectedFile) {
        const imageUrl = await uploadImage(selectedFile, postId);

        // Update the post with the image URL
        await updatePostImage(postId, imageUrl);
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
    // Implement your logic to update the post with the image URL
    // Example: Call an API to update the post in your backend
  };

  return (
    <div className={styles.combined8}>
      <div className={styles.combined9}>
        <div>
          {session?.user?.image ? (
            <Image
              className={styles.combined10}
              src={session?.user?.image}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <div>No image available</div>
          )}
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
              <Image src={selectedFile} alt="" className={styles.combined5} />
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

      {/* Display the formatted timestamp */}
      {formattedTimestamp && (
        <div className={styles.timestamp}>{formattedTimestamp}</div>
      )}
    </div>
  );
};

export default Input;
