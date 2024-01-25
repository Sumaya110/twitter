import React, { useContext, useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import styles from "@/components/Post/Post.module.css";
import Image from "next/image";
import "moment-timezone";
import { deletePost, getPost, updatePost } from "@/libs/action/postAction";
import { useDispatch } from "react-redux";
import { openModal } from "@/action/action";

const Post = ({ id, post }) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const { data: session } = useSession();
  const userId = session.user.uid;
  const username = session.user.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await getPost(id);

        const comments = post.comments;
        const likes = post.likes;

        setComments(comments);
        setLikes(likes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const checkIfLiked = (likes, userId) => {
      return likes.some((like) => like.id === userId);
    };

    const likeOrUnlikePost = async () => {
      try {
        const post = await getPost(id);

        if (checkIfLiked(post.likes, userId)) {
          post.likes = post.likes.filter((like) => like.id !== userId);
        } else {
          post.likes.push({ id: userId, username });
        }

        await updatePost(id, {
          likes: likes,
          comments: comments,
        });
      } catch (error) {
        console.error("Error updating likes:", error);
        throw error;
      }
    };

    likeOrUnlikePost();
  }, [likes]);

  const likePost = async () => {
    try {
      const post = await getPost(id);

      if (!post) {
        return console.error("Post not found");
      }

      const likedIndex = post.likes.findIndex(
        (like) => like.userId === session.user.uid
      );
      // console.log("liked index", likedIndex)

      if (likedIndex !== -1) {
        post.likes.splice(likedIndex, 1);
        // console.log("unlike :", post.likes)
      } else {
        post.likes.push({
          userId: session.user.uid,
          username: session.user.username,
          userImg: session.user.userImg,
        });
      }

      // console.log("post likes  : ", post.likes)

      await updatePost(id, {
        likes: post.likes,
      });
      console.log("Post liked/unliked successfully");
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleChatIconClick = () => {
    // e.stopPropagation();
    dispatch(openModal(post, id));
  };

  const handleDeletePost = async () => {
    try {
      console.log("idd  :", id);
      await deletePost(id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleRoute = () => {
    // router.push(`/${id}`);
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
              handleChatIconClick();
            }}
          />
          {comments.length > 0 && (
            <span className={styles.textSm}>{comments.length}</span>
          )}
        </div>
        {session.user.uid !== post?.userId ? (
          <FaRetweet className={styles.combined10} />
        ) : (
          <RiDeleteBin5Line
            className={styles.combined10}
            onClick={(e) => {
              e.stopPropagation();
              handleDeletePost();
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
          {likes && likes.length > 0 && (
            <span className={`${liked && styles.textPink} ${styles.textSm}`}>
              {likes.length}
            </span>
          )}

          {likes && likes.length > 0 && (
            <span className={`${liked}`}>{likes.length}</span>
          )}
        </div>
        <AiOutlineShareAlt className={styles.combined10} />
      </div>
    </div>
  );
};

export default Post;
