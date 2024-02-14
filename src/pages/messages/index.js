import { getUserId } from "@/libs/services/user-service";
import { getSession } from "next-auth/react";
import MessagePage from "@/components/MessagePage/MessagePage";


const messages = ({ user }) => {

  return (
    <div>
      <MessagePage user={user} />
    </div>
  );
};

export default messages;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let existUser = null;

  if (session?.user?._id) {
    try {
      existUser = await getUserId(session?.user?._id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const serializedUser = existUser
    ? JSON.parse(JSON.stringify(existUser))
    : null;

  return {
    props: {
      user: serializedUser,
    },
  };
}












// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// let socket;

// const Home = () => {
//   useEffect(() => {
//     socketInitializer();

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   async function socketInitializer() {
//   }

//   function handleSubmit(e) {
//   }

//   return (
//     <div>
//       <h1>Chat app</h1>
//     </div>
//   );
// };

// export default Home;