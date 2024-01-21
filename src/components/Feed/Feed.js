import React, { useEffect, useState } from "react";
import styles from "@/components/Feed/Feed.module.css";
import Input from "@/components/Input/Input";
import { HiOutlineSparkles } from "react-icons/hi";
import { getPost } from "@/libs/action/postAction";
import Post from "../Post/Post";
import Image from "next/image";
import Moment from "react-moment";
import 'moment-timezone';

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPost(user.uid);
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

      <Input />

      {posts &&
        posts.map((post) => {
          const { _id, id, username, userImg, text, timestamp } = post;
          return (
            <div key={_id} className={styles.postContainer}>
              <div className={styles.sameSpan}>
                <Image
                  className={styles.image}
                  src={userImg}
                  alt={`${username}'s avatar`}
                  width={30}
                  height={30}
                />
                <span className={styles.userName}>{username}</span>
                {/* <p className={styles.time}> */}
                  <Moment fromNow  className={styles.time}>{timestamp}</Moment>
                {/* </p> */}
              </div>
              <div>{text}</div>
            </div>
          );
        })}
    </section>
  );
};

export default Feed;
