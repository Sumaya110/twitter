import React, { useState } from "react";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineGif, AiOutlineClose } from "react-icons/ai";
import { RiBarChart2Line } from "react-icons/ri";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useSession } from "next-auth/react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
// import { getDownloadURL, ref, uploadString } from 'firebase/storage'

import styles from "@/components/Input/Input.module.css";

const Input = () => {
  const { data: session } = useSession();
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

    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
  };

  return (
    <div className={styles.combined8}>
      <div className={styles.combined9}>
        <div>
                    <image className={styles.combined10} src={session?.user?.image} alt="" />
                </div>

        <div className={styles.combined7}>
          <textarea
            className={styles.combined6}
            rows="2"
            placeholder="What's Happening?"
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
              <image src={selectedFile} alt="" className={styles.combined5} />
            </div>
          )}
          
                    {!loading && (
                        <div className={styles.combined11}>

                            <div className={styles.combined12}>

                                <label htmlFor="file">
                                    <BsImage className={styles.clickable} />
                                </label>

                                <input id="file" type="file"
                                    hidden
                                    onChange={addImageToPost}
                                />

                                <div className={styles.combined13}>
                                    <AiOutlineGif />
                                </div>
                                <RiBarChart2Line className={styles.rotatedCw} />
                                <BsEmojiSmile className={styles.clickable} onClick={() => setShowEmojis(!showEmojis)} />
                                <IoCalendarNumberOutline />
                                <HiOutlineLocationMarker />
                            </div>

                            <button
                                className={styles.combined14}
                                disabled={!input.trim() && !selectedFile}
                                onClick={sendPost} >
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
