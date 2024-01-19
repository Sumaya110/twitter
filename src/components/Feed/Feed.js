import React, { useEffect, useState } from "react";
import styles from "@/components/Feed/Feed.module.css";
import Input from "@/components/Input/Input";
import { HiOutlineSparkles } from "react-icons/hi";
import { getPost } from "@/libs/action/postAction";
import Post from "../Post/Post";
import Image from "next/image";

const Feed = ({ user }) => {
  console.log("user and uid ", user.uid);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPost(user.uid);

        console.log("from feed ", data);
        console.log("from feed ", user.uid)

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
          const { _id, id, username, userImg, text } = post;
          return (
            <tr key={_id}>
              <td>
                <div>
                  <Image
                    className={styles.image}
                    src={userImg}
                    alt={`${username}'s avatar`}
                    width={30}
                    height={30}
                  />
                  {username}
                </div>
                <div>{text}</div>
              </td>
            </tr>
          );
        })}
    </section>
  );
};
export default Feed;
