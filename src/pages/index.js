import React from "react";
import Index from "@/components/Index/Index";
import { getSession } from "next-auth/react";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";

const IndexPage = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Index user={user} />
    </div>
  );
};

export default IndexPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      user: session?.user || null,
    },
  };
}
