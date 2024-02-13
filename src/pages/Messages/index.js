import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  useEffect(() => {
    socketInitializer();

    return () => {
      socket.disconnect();
    };
  }, []);

  async function socketInitializer() {
  }

  function handleSubmit(e) {
  }

  return (
    <div>
      <h1>Chat app</h1>
    </div>
  );
};

export default Home;