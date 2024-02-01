import React, { useEffect, useState } from "react";
import styles from "@/components/Feed/Feed.module.css";
import Input from "@/components/Input/Input";
import { HiOutlineSparkles } from "react-icons/hi";
import { getPosts } from "@/libs/action/postAction";
import Post from "../Post/Post";
import "moment-timezone";
import { getUser } from "@/libs/action/userAction";

const Feed = ({ user, pic }) => {
  const [posts, setPosts] = useState([]);
  const [pp, setPp] =useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(user.uid);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user.uid]);

  return (
    <section className={styles.section}>
      <div className={styles.sectiondiv}>
        Home
        <HiOutlineSparkles />
      </div>

      <Input pic={pic} />

      {posts
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .map((post) => (
          <Post key={post._id} id={post._id} post={post} pic={pic} />
        ))}
    </section>
  );
};

export default Feed;
