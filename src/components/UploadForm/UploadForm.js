import { useState } from "react";
import Image from "next/image";
import styles from "./UploadFrom.module.css";
import { AiOutlineClose } from "react-icons/ai";

export default function PrivatePage() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

    // const uploadToClient = (event) => {
    //   if (event.target.files && event.target.files[0]) {
    //     const i = event.target.files[0];

    //     console.log("url  : ", i);

    //     setImage(i);
    //     setCreateObjectURL(URL.createObjectURL(i));
    //   }
    // };

    // const uploadToServer = async () => {
    //   const body = new FormData();
    //   body.append("file", image);

    //   console.log("ekhon dekhao", body)

    //   const response = await fetch("/api/upload", {
    //     method: "POST",
    //     body,
    //   });
    // };

  const addImageToPost = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };

    const i = e.target.files[0];

    console.log("url  : ", i);

    setImage(i);
    setCreateObjectURL(URL.createObjectURL(i));
    const url = URL.createObjectURL(i);
    console.log("eita URL  : ", url);

    const body = new FormData();
    body.append("file", image);
    
    console.log("body  :", body)

    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };



  return (
    <div>
      <div>
        {/* <img src={createObjectURL} alt="" />
   
        <input type="file" name="myImage" onChange={uploadToClient} /> 
        <button
          className="btn btn-primary"
          type="submit"
          onClick={()=>uploadToServer()}
        >
          Send to server
        </button> */}

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
