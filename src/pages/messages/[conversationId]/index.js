import React from "react";
import ConversationPage from "@/components/ConversationPage/ConversationPage";
import { getSession } from "next-auth/react";
import { getUserId } from "@/libs/services/user-service";

const IndexPage = ({ user }) => {
  return (
    <div>
      <ConversationPage user={user} />
    </div>
  );
};

export default IndexPage;

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

 
  const serializedUser = existUser ? JSON.parse(JSON.stringify(existUser)) : null;

  return {
    props: {
      user: serializedUser,
    },
  };
}
