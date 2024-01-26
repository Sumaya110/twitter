import React, { useEffect, useState } from "react";

import Sidebar from "../Sidebar/Sidebar";

import Trending from "../Trending/Trending";
import SinglePost from "../SinglePost/SinglePost";
import { useRouter } from 'next/router';

import Modal from "../Modal/Modal";
import styles from "@/components/Id/Id.module.css";
import { getPost } from "@/libs/action/postAction";

const Id = () => {


    const [post, setPost] = useState([])
    const router = useRouter()
    const { id } = router.query;
    const [comments, setComments] = useState([])

    

    useEffect(() => {
        const fetchComments = async () => {
          try {
            const post = await getPost(id);

            // console.log("posst : ", post.comments)
            const fetchedComments= post.comments;

            setComments(fetchedComments);
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
        };
    
        fetchComments();
      }, [id]);

      useEffect(() => {

        const fetchpost = async () => {
          try {
            const post = await getPost(id);
    
            setPost(post)
          } catch (error) {
            console.error("Error fetching post:", error);
          }
        };
    
        fetchpost();
      }, []);


  return (
    <div>
      <main className={styles.combined}>
        <Sidebar />
        <div className={styles.combined2}>
          <SinglePost />
          <Trending />
          <Modal />
          {/* {appContext?.isModalOpen && <Modal />} */}
        </div>
      </main>
    </div>
  );
};

export default Id;



