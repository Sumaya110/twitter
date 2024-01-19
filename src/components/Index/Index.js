// Inside Index.jsx
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Login from "@/components/Login/Login";
import Sidebar from "@/components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";
import Trending from "../Trending/Trending";
import styles from "@/components/Index/Index.module.css";
import { useRouter } from "next/router";
import HomePage from "../HomePage/HomePage";

const Index = ({ user }) => {
  const [noUser, setNoUser] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  console.log("user ", user);

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
