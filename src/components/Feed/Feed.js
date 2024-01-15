// import React, { useEffect, useState } from 'react';
// import { FaSparkles } from "react-icons/fa";
// import Input from "@/components/Input/Input"
// import Post from "@/components/Post/Post"
// import styles from "@/components/Feed/Feed.module.css"


// const fetchPostsFromMongoDB = async () => {
//   const postsData = await fetch('/api/posts');
//   return postsData.json();
// };

// const Feed = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const postsData = await fetchPostsFromMongoDB();
//       setPosts(postsData);
//     };

//     fetchData();
//   }, []);

//   return (
//     <section className={styles.section}>
//       <div className={styles.sectiondiv}>
//         Home
//         <FaSparkles />
//       </div>

//       <Input />
//       {/* {posts.map((post) => (
//         <Post key={post._id} id={post._id} post={post} />
//       ))} */}
//     </section>
//   );
// };

// export default Feed;

import React from 'react'

const Feed = () => {
  return (
    <div>Feed</div>
  )
}

export default Feed
