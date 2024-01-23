import React, { useContext, useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import styles from "@/components/Post/Post.module.css";
import Image from "next/image";
import "moment-timezone";
import { getPost } from "@/libs/action/postAction";

const Post = ({ id, post }) => {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const { data: session } = useSession();
  const router = useRouter();


  useEffect(() =>{

    const fetchComments = async (id) => {
        try {

          const post = await getPost(id)

          return post.comments;
        } catch (error) {
          console.error('Error fetching comments:', error);
          throw error;
        }
      };

      fetchComments()

  }, [id])

  // Fetch comments for a post
// const fetchComments = async (postId) => {
//   try {
//     const post = await Posts.findById(postId);
//     return post.comments;
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     throw error;
//   }
// };

// Fetch likes for a post
// const fetchLikes = async (postId) => {
//   try {
//     const post = await Posts.findById(postId);
//     return post.likes;
//   } catch (error) {
//     console.error('Error fetching likes:', error);
//     throw error;
//   }
// };

// // Check if the current user has liked the post
// const checkIfLiked = (likes, userId) => {
//   return likes.some((like) => like.id === userId);
// };

// // Like or unlike a post
// const likeOrUnlikePost = async (postId, userId, username) => {
//   try {
//     const post = await Posts.findById(postId);

//     if (checkIfLiked(post.likes, userId)) {
//       // Unlike the post
//       post.likes = post.likes.filter((like) => like.id !== userId);
//     } else {
//       // Like the post
//       post.likes.push({ id: userId, username });
//     }

//     await post.save();
//   } catch (error) {
//     console.error('Error updating likes:', error);
//     throw error;
//   }
// };

   

  const handleRoute = () => {
    router.push(`/${id}`);
  };

  return (
    <div className={styles.combined} onClick={() => handleRoute()}>
      {post && (
        <div>
          <div key={post._id} className={styles.postContainer}>
            <div className={styles.sameSpan}>
              <Image
                className={styles.image}
                src={post.userImg}
                alt={`${post.username}'s avatar`}
                width={40}
                height={40}
              />

              <div className={styles.topBottom}>

              <span className={styles.userName}>{post.username}</span>
              <span className={styles.tag}>@{session?.user?.tag}</span>

              </div>
             


              <Moment fromNow className={styles.time}>
                {post.timestamp}
              </Moment>
            </div>
            
            
            <div>{post.text}</div>

            {post.imageUrl && (
              <Image
                className={styles.image2}
                src={post.imageUrl}
                alt=""
                width={500}
                height={500}
                priority
              />
            )}
          </div>
        </div>
      )}

      <div className={styles.combined8}>
        <div className={styles.combined9}>
          <BsChat
            className={styles.combined10}
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          />
          {comments.length > 0 && (
            <span className={styles.textSm}>{comments.length}</span>
          )}
        </div>
        {session.user.uid !== post?.id ? (
          <FaRetweet className={styles.combined10} />
        ) : (
          <RiDeleteBin5Line
            className={styles.combined10}
            onClick={(e) => {
              e.stopPropagation();
              deleteDoc(doc(db, "posts", id));
            }}
          />
        )}
        <div
          className={styles.combined11}
          onClick={(e) => {
            e.stopPropagation();
            likePost();
          }}
        >
          {liked ? (
            <AiFillHeart className={styles.combined12} />
          ) : (
            <AiOutlineHeart className={styles.combined13} />
          )}
          {likes.length > 0 && (<span className={`${liked && styles.textPink } {styles.textSm}`}>{likes.length}</span>)}
          {likes.length > 0 && (<span className={`${liked }`}>{likes.length}</span>)}
        </div>
        <AiOutlineShareAlt className={styles.combined10} />
      </div>
    </div>
  );
};

export default Post;
