import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import { useRouter } from "next/router";
import HomePage from "../HomePage/HomePage";

const Index = ({ user }) => {
  const [noUser, setNoUser] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  console.log("user ", session);

  useEffect(() => {
    const replace = async () => {
      if (user) {
        await router.replace("/home");
      } else {
        setNoUser(true);
      }
    };

    replace();
  }, [user, router]);

  return <div>{ noUser ? (<Login /> ): (<HomePage user={user} /> )}</div>;
};

export default Index;
