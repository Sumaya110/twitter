import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/EditProfileModal/EditProfileModal.module.css";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { updateUser } from "@/libs/action/userAction";

const Modal = ({ onClose, user }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(user.username);

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

  const updateProfileButton = async () => {


    console.log("js  : ", user._id)
   await updateUser( user._id, {
    username: name,
   })

  };

  const closeModal = (e) => {
    onClose();
  };

  const modalContent = (
    <div className={styles.closeModal}>
      <div
        className={styles.stopPropagation}
        onClick={(e) => e.stopPropagation()}
      >
        <MdClose
          className={styles.mdClose}
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        />
        <button
          className={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            updateProfileButton();
            closeModal();
          }}
        >
          Save
        </button>

        <div className={styles.coverPictureContainer}>
          <Image
            src={user?.coverPicture}
            alt=""
            className={styles.userImage2}
            width={200}
            height={200}
          />
          <div className={styles.profilePictureOverlay}>
            <Image
              src={user?.profilePicture}
              alt=""
              className={styles.userImage}
              width={200}
              height={200}
            />
          </div>
        </div>

        <div>

          <button  className={styles.name} >
            <p className={styles.p}> Name </p>
          
          <textarea
            className={styles.textAreaStyle}
            rows="4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </button>
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
