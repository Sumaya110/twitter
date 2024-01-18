import React, { useEffect, useState } from 'react'
import styles from "@/components/Feed/Feed.module.css"
import Input from "@/components/Input/Input"
import { HiOutlineSparkles } from 'react-icons/hi';
import { getPost } from '@/libs/action/postAction';
import Post from '../Post/Post';

const Feed = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getPost()

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.sectiondiv}>
        Home
        <HiOutlineSparkles/>
      </div>

      <Input/>
      
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post.data()} />
      ))}
     
    </section>
  );
};
export default Feed