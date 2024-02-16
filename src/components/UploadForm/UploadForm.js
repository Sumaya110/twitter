import { useState } from "react";
import styles from "./UploadFrom.module.css";
import { AiOutlineClose } from "react-icons/ai";

export default function PrivatePage() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const addImageToPost = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };

    const i = e.target.files[0];

    setImage(i);
    setCreateObjectURL(URL.createObjectURL(i));
    const url = URL.createObjectURL(i);

    const body = new FormData();
    body.append("file", image);

    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };

  return (
    <div>
      <div>
        <input id="file" type="file" hidden onChange={addImageToPost} />
        {selectedFile && (
          <div className={styles.combined2}>
            <div
              className={styles.combined3}
              onClick={() => setSelectedFile(null)}
            >
              <AiOutlineClose className={styles.combined4} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
