import React, { useState } from "react";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSession } from "next-auth/react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styles from "@/components/Input/Input.module.css";
import { createPost } from "@/libs/action/postAction";
import Image from "next/image";

const Input = () => {
  const { data: session } = useSession();

  // console.log("from input file", session);

  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
      });

      // console.log("post Id ", postId);

      // if (selectedFile) {
      //   const imageUrl = await uploadImage(selectedFile, postId);

      //   await db.collection("posts").updateOne(
      //     { _id: postId },
      //     { $set: { image: imageUrl } }
      //   );
      // }
    } catch (error) {
      console.error("Error sending post !! :", error);
    } finally {
      setLoading(false);
      setInput("");
      setSelectedFile(null);
      setShowEmojis(false);
    }
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
            // Render a placeholder or alternative content if the image is not available
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
                onClick={(e)=>{
                  e.stopPropagation()
                  sendPost()
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
    </div>
  );
};

export default Input;
