import React, { useEffect } from "react";
import ConversationPage from "@/components/ConversationPage/ConversationPage";
import { getSession } from "next-auth/react";
import { getUserId } from "@/libs/services/user-service";
import { useRouter } from "next/router";
import {
  getConversation,
  getConversation2,
} from "@/libs/services/conversation-service";

const IndexPage = ({ user }) => {
  const router = useRouter();
  const conversationId = router.query.conversationId;

  return (
    <div>
      <ConversationPage user={user} conversationId={conversationId} />
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

  const serializedUser = existUser
    ? JSON.parse(JSON.stringify(existUser))
    : null;

  return {
    props: {
      user: serializedUser,
    },
  };
}
