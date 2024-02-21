import React, { useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import Moment from "react-moment";
import styles from "@/components/Post/Post.module.css";
import Image from "next/image";
import "moment-timezone";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "@/libs/action/postAction";
import Modal from "../Modal/Modal";
import Comment from "../Comment/Comment";
import { FaEdit } from "react-icons/fa";
import EditModal from "@/components/EditModal/EditModal";
import { setPosts } from "@/actions/actions";
import { useDispatch } from "react-redux";
import { getUser } from "@/libs/action/userAction";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Post = ({ id, post, user, fetchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [postUser, setPostUser] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchdata = async () => {
      var info = null;

      if (post?.retweetedFrom) info = await getUser(post?.retweetedFrom);
      else info = await getUser(post?.userId);

      setPostUser(info);
    };
    fetchdata();
  }, [post, user]);

  const handleUser = async () => {
    router.push(`/profileId/${postUser?._id}`);
  };

  const likePost = async () => {
    const likedIndex = post?.likes?.findIndex(
      (like) => like.userId === user?._id
    );

    if (likedIndex !== -1) {
      post?.likes?.splice(likedIndex, 1);

      setLiked(false);
    } else {
      setLiked(true);
      post?.likes?.push({
        userId: user?._id,
        username: user?.username,
        userImg: user?.userImg,
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

  const handleRetweetPost = async () => {
    const postId = await createPost({
      userId: user?._id,
      userEmail: post?.userEmail,
      username: post?.username,
      text: post?.text,
      imageUrl: post?.imageUrl,
      retweetedFrom: post?.userId,
      retweetedBy: user?.name,
    });

    const data = await getPosts(user?._id);
    dispatch(setPosts(data));
  };

  return (
    <div className={styles.combined}>
      <div className={styles.full}>
        {post && (
          <div>
            <div key={post?._id} className={styles.postContainer}>
              {post?.retweetedBy && (
                <div className={styles.flex}>
                  <div className={styles.icon}>
                    {" "}
                    <FaRetweet />{" "}
                  </div>

                  {post.retweetedBy === user?.name
                    ? "You retweeted this post"
                    : `${post.retweetedBy} retweeted this post`}
                </div>
              )}
              <div className={styles.sameSpan}>
                <Image
                  className={styles.image}
                  src={
                    postUser?.profilePicture ||
                    "/images/blank-profile-picture.webp"
                  }
                  alt={`${postUser?.username}'s avatar`}
                  width={40}
                  height={40}
                />

                <div className={styles.topBottom}>
                  <span
                    className={styles.userName}
                    onClick={() => handleUser()}
                  >
                    {postUser?.name}
                  </span>
                  <span className={styles.tag}>@{postUser?.username}</span>
                </div>

                <Moment fromNow className={styles.time}>
                  {post?.createdAt}
                </Moment>

                {session?.user?._id === post?.userId && (
                  <FaEdit
                    className={styles.edit}
                    onClick={() => setShowEditModal(true)}
                  />
                )}

                {showEditModal && (
                  <EditModal
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
          <FaRetweet
            className={styles.combined10}
            onClick={(e) => {
              e.stopPropagation();
              handleRetweetPost();
            }}
          />

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

          {session?.user?._id === post?.userId && (
            <RiDeleteBin5Line
              className={styles.combined10}
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePost();
              }}
            />
          )}
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
                fetchData={() => fetchData}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
