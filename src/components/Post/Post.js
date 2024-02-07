import React, { useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import Moment from "react-moment";
import styles from "@/components/Post/Post.module.css";
import Image from "next/image";
import "moment-timezone";
import { deletePost, getPost, getPosts, updatePost } from "@/libs/action/postAction";
import Modal from "../Modal/Modal";
import Comment from "../Comment/Comment";
import { FaEdit } from "react-icons/fa";
import EditModal from "@/components/EditModal/EditModal"
import { setPosts } from "@/actions/actions";
import { useDispatch } from 'react-redux';


const Post = ({ id, post, user , fetchData}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [liked, setLiked] = useState(false);


  const dispatch = useDispatch();


  const likePost = async () => {
    const likedIndex = post?.likes?.findIndex(
      (like) => like.userId ===user?._id
    );

    if (likedIndex !== -1) {
      post?.likes?.splice(likedIndex, 1);

      setLiked(false);
    } else {
      setLiked(true);
      post?.likes?.push({
  
        userId: user?._id,
        username: user?.username,
        userImg: user?.profilePicture,
      });
    }

    await updatePost(id, {
      likes: post?.likes,
    });

    const data = await getPosts(user?._id);
    dispatch(setPosts(data));
  };

  const handleDeletePost = async () => {
    await deletePost(id);
    const data = await getPosts(user?._id);
    dispatch(setPosts(data));
  };

  return (
    <div className={styles.combined}>
      <div className={styles.full}>
        {post && (
          <div>
            <div key={post?._id} className={styles.postContainer}>
              <div className={styles.sameSpan}>

                {post?.userImg ? (
                  <Image
                    className={styles.image}
                    src={post?.userImg}
                    alt={`${post?.username}'s avatar`}
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    className={styles.image}
                    src={pic}
                    alt={`${post?.username}'s avatar`}
                    width={40}
                    height={40}
                  />

                )}

                <div className={styles.topBottom}>
                  <span className={styles.userName}>{post?.username}</span>
                  <span className={styles.tag}>@{user?.username}</span>
                </div>

                <Moment fromNow className={styles.time}>
                  {post?.timestamp}
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
                    user={user}
                  />
                )}
              </div>

              <div className={styles.textStyle}>{post?.text}</div>

              {post?.imageUrl && (
                <Image
                  className={styles.image2}
                  src={post?.imageUrl}
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
            
                user={user}
                option={1}
              />
            )}

            {post?.comments?.length > 0 && (
              <span className={styles.textSm}>{post?.comments?.length}</span>
            )}
          </div>
          {user?._id !== post?.userId ? (
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

            {post?.likes && post?.likes?.length > 0 && (
              <span className={styles.textPink}>{post?.likes?.length}</span>
            )}
          </div>
          <AiOutlineShareAlt className={styles.combined10} />
        </div>
      </div>

      <div className={styles.combined3}>
        {post?.comments?.length > 0 && (
          <div className={styles.pb}>
            {post?.comments?.map((comment) => (
              <Comment
                key={comment?._id}
                comment={comment}
                postId={id}
                comments={post?.comments}
                post={post}
            
                user={user}
                fetchData={()=>fetchData()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
