import React from "react";
import styles from "@/components/NewMessage/NewMessage.module.css";

const NewMessage = () => {

  const handleConversation = () => {

    

  }


  return (
    <div className={styles.combined}>
      <h1>Select a message</h1>

      <div>
        Choose from your existing conversations, start a new one, or just keep
        swimming.
      </div>

      <button onClick={()=> handleConversation()}>New Message </button>
    </div>
  );
};

export default NewMessage;
