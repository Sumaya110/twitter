import React from 'react'
import styles from "@/components/Conversation/Conversation.module.css"
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSocket } from '@/libs/Context/Context';

const Conversation = () => {

  const socket = useSocket();


    useEffect(() => {
    socketInitializer();

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  async function socketInitializer() {
    // socket = io();
    if(!socket) return;

    socket.on("receive-message", (data) => {
  
    });
  }


  return (
    <div>
      

       <h1>Enter a username</h1>

      {/* <input value={username} onChange={(e) => setUsername(e.target.value)} /> */}

      <br />
      <br />

      {/* <div>
        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div> */}


    </div>

    
  )
}

export default Conversation
