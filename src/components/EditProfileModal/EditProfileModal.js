import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/EditProfileModal/EditProfileModal.module.css";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getUser, updateUser } from "@/libs/action/userAction";
import { AiOutlineClose } from "react-icons/ai";
import { TbCameraPlus } from "react-icons/tb";
import { setUsers } from "@/actions/actions";


const Modal = ({ onClose, user }) => {
  const [proPic, setProPic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [name, setName] = useState(user.username);
  const [selectedProPic, setSelectedProPic] = useState(user.profilePicture);
  const [selectedCoverPic, setSelectedCoverPic] = useState(user.coverPicture);

  const dispatch = useDispatch();

  const addImageToProPic = (e) => {
    console.log("cholo");
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      const i = e.target.files[0];
      setProPic(i);
    }
    reader.onload = (readerEvent) => {
      setSelectedProPic(readerEvent.target.result);
    };
  };

  const addImageToCoverPic = (e) => {
    console.log("hello");
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      const i = e.target.files[0];
      setCoverPic(i);
    }
    reader.onload = (readerEvent) => {
      setSelectedCoverPic(readerEvent.target.result);
    };
  };

  const updateProfileButton = async () => {
    let url = null;
    if (selectedProPic !== user.profilePicture) {
      const body = new FormData();
      body.append("file", proPic);
      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      url = await response.json();
      await updateUser(user._id, {
        profilePicture: url,
      });

      const data = await getUser(user?._id);
      dispatch(setUsers(data));
    }

    if (selectedCoverPic !== user.coverPicture) {
      const body = new FormData();
      body.append("file", coverPic);
      const response = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      url = await response.json();
      await updateUser(user._id, {
        coverPicture: url,
      });

      const data = await getUser(user?.email);
      // console.log("dataaaaaaaa : ", data)
      dispatch(setUsers(data));
      // console.log("user :  ", users)
    }

    if (name !== user.username) {
      await updateUser(user?._id, {
        username: name,
      });

      const data = await getUser(user?.email);
      dispatch(setUsers(data));
    }
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
          {selectedCoverPic && (
            <div className={styles.modal2}>
              <div
                className={styles.modalCover}
                onClick={() => setSelectedCoverPic(user.coverPicture)}
              >
                <AiOutlineClose className={styles.modal4} />
              </div>

              <label htmlFor="cover" className={styles.cover}>
                <TbCameraPlus className={styles.clickable_cover} />
              </label>

              <Image
                src={selectedCoverPic}
                alt=""
                width={300}
                height={300}
                className={styles.userImage2}
                priority={true}
              />
            </div>
          )}

          <input id="cover" type="file" hidden onChange={addImageToCoverPic} />

          {selectedProPic && (
            <div className={styles.profilePictureOverlay}>
              <div
                className={styles.modalPro}
                onClick={() => setSelectedProPic(user.profilePicture)}
              >
                <AiOutlineClose className={styles.modal44} />
              </div>
              <label htmlFor="pro" className={styles.pro}>
                <TbCameraPlus className={styles.clickable} />
              </label>

              <Image
                src={selectedProPic}
                alt=""
                width={300}
                height={300}
                className={styles.userImage}
                priority={true}
              />
            </div>
          )}
          <input id="pro" type="file" hidden onChange={addImageToProPic} />
        </div>

        <div>
          <button className={styles.name}>
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