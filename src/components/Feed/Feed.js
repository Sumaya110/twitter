import React, { useEffect, useState } from "react";
import styles from "@/components/Feed/Feed.module.css";
import Input from "@/components/Input/Input";
import { HiOutlineSparkles } from "react-icons/hi";
import { getPosts } from "@/libs/action/postAction";
import Post from "../Post/Post";
import "moment-timezone";
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from "@/actions/actions";

const Feed = ({ user}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getPosts(user._id);
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectiondiv}>
        Home
        <HiOutlineSparkles />
      </div>

      <Input user={user} />

      {posts?.map((post) => (
        <Post key={post._id} id={post._id} post={post} user={user} fetchData={()=>fetchData()} />
      )) }


    </section>
  );
};

export default Feed;
