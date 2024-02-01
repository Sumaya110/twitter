import React, { useEffect, useState } from "react";
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
import Modal from "../Modal/Modal";
import Comment from "../Comment/Comment";
import { FaEdit } from "react-icons/fa";
import EditModal from "@/components/EditModal/EditModal"

const Post = ({ id, post, pic }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const likePost = async () => {
    try {
      const post = await getPost(id);

      const likedIndex = post.likes.findIndex(
        (like) => like.userId === session.user.uid
      );

      if (likedIndex !== -1) {
        post.likes.splice(likedIndex, 1);

        setLiked(false);
      } else {
        setLiked(true);
        post.likes.push({
          userId: session.user.uid,
          username: session.user.username,
          userImg: session.user.userImg,
        });
      }
      await updatePost(id, {
        likes: post.likes,
      });

      console.log("Post liked/unliked successfully", liked, id);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      console.log("idd  for delete:", id);
      await deletePost(id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className={styles.combined}>
      <div className={styles.full}>
        {post && (
          <div>
            <div key={post._id} className={styles.postContainer}>
              <div className={styles.sameSpan}>

                {post?.userImg ? (
                <Image
                  className={styles.image}
                  src={post.userImg}
                  alt={`${post.username}'s avatar`}
                  width={40}
                  height={40}
                />
                ):(
                <Image
                  className={styles.image}
                  src={pic}
                  alt={`${post.username}'s avatar`}
                  width={40}
                  height={40}
                />

                )}

                <div className={styles.topBottom}>
                  <span className={styles.userName}>{post.username}</span>
                  <span className={styles.tag}>@{session?.user?.tag}</span>
                </div>

                <Moment fromNow className={styles.time}>
                  {post.timestamp}
                </Moment>

                <FaEdit
                  className={styles.edit}
                  onClick={() => setShowEditModal(true)}
                />
                {showEditModal && (
                  < EditModal
                    onClose={() => setShowEditModal(false)}
                    id={id}
                    post={post}
                  />
                )}
              </div>

              <div className={styles.textStyle}>{post.text}</div>

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
              onClick={() => setShowModal(true)}
            />
            {showModal && (
              <Modal
                onClose={() => setShowModal(false)}
                id={id}
                post={post}
                pic={pic}
                option={1}
              />
            )}

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
              <span className={styles.textPink}>{likes.length}</span>
            )}
          </div>
          <AiOutlineShareAlt className={styles.combined10} />
        </div>
      </div>

      <div className={styles.combined3}>
        {comments.length > 0 && (
          <div className={styles.pb}>
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                postId={id}
                comments={post.comments}
                post={post}
                pic={pic}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
