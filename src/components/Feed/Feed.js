import React, { useEffect, useState } from "react";
import styles from "@/components/Feed/Feed.module.css";
import Input from "@/components/Input/Input";
import { HiOutlineSparkles } from "react-icons/hi";
import { getPosts } from "@/libs/action/postAction";
import Post from "../Post/Post";
import "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/actions/actions";

const Feed = ({ user }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const postsPromises = user.following.map(async (follower) => {
        return await getPosts(follower.userId);
      });

      const currentUserPosts = await getPosts(user._id);
      const postsData = await Promise.all([...postsPromises, currentUserPosts]);
      const allPosts = postsData.reduce((acc, curr) => acc.concat(curr), []);

      allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      dispatch(setPosts(allPosts));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectiondiv}>
        Home
        <HiOutlineSparkles />
      </div>

      <Input user={user} />

      {posts?.map((post) => (
        <Post
          key={post?._id}
          id={post?._id}
          post={post}
          user={user}
          fetchData={() => fetchData()}
        />
      ))}
    </div>
  );
};

export default Feed;
