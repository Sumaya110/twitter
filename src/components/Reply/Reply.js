import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import Moment from "react-moment";
import styles from "@/components/Reply/Reply.module.css";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getPosts, updatePost } from "@/libs/action/postAction";
import { useEffect, useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import ReplyEditModal from "@/components/ReplyEditModal/ReplyEditModal";
import { setPosts } from "@/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getUser } from "@/libs/action/userAction";

function Reply({ comment, postId, comments, post, reply, user }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [replyUser, setReplyUser]= useState(null)
  const { data: session } = useSession();
  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();

  const replyId = reply?._id;
  const commentId = comment?._id;

  useEffect(() => {
    const fetchdata = async () => {
      const info = await getUser(reply?.userId);
      setReplyUser(info);
    };
    fetchdata();
  }, [reply, user]);

  const handleDeleteReply = async () => {
    const commentToUpdate = post?.comments?.find(
      (comment) => comment._id === commentId
    );

    commentToUpdate.replies = commentToUpdate?.replies?.filter(
      (reply) => reply._id !== replyId
    );

    await updatePost(postId, { comments: post.comments });
    const data = await getPosts(user?._id);
    dispatch(setPosts(data));
  };

  const likeReply = async () => {
    const commentToUpdate = post?.comments?.find(
      (comment) => comment._id === commentId
    );

    const replyToUpdate = commentToUpdate?.replies?.find(
      (reply) => reply._id === replyId
    );

    const likedIndex = replyToUpdate?.likes?.findIndex(
      (like) => like.userId === user?._id
    );

    if (likedIndex !== -1) {
      replyToUpdate.likes.splice(likedIndex, 1);
      setLiked(false);
    } else {
      setLiked(true);
      replyToUpdate.likes.push({
        userId: user?._id,
        username: user?.username,
        userImg: user?.userImg,
      });
    }
    await updatePost(postId, { comments: post.comments });
    const data = await getPosts(user?._id);
    dispatch(setPosts(data));
  };

  return (
    <div>
      <div>
        <BsArrowReturnRight className={styles.arrow} />
      </div>
      <div className={styles.combined}>
        <div className={styles.replyContainer}>
          <div className={styles.sameSpan}>
            <Image
              className={styles.image}
              src={replyUser?.profilePicture || "/images/blank-profile-picture.webp"}
              alt={`${replyUser?.username}'s avatar`}
              width={40}
              height={40}
            />

            <div className={styles.topBottom}>
              <span className={styles.userName}>{replyUser?.name}</span>
              <span className={styles.tag}>@{replyUser?.username}</span>
            </div>

            <Moment fromNow className={styles.time}>
              {reply?.createdAt}
            </Moment>

            {session?.user?._id === reply?.userId && (
              <FaEdit
                className={styles.edit}
                onClick={() => setShowEditModal(true)}
              />
            )}

            {showEditModal && (
              <ReplyEditModal
                onClose={() => setShowEditModal(false)}
                postId={postId}
                commentId={commentId}
                replyId={replyId}
                post={post}
                comment={comment}
                reply={reply}
                user={user}
              />
            )}
          </div>

          <div className={styles.text}>{reply?.text}</div>

          {reply?.imageUrl && (
            <Image
              className={styles.image2}
              src={reply?.imageUrl}
              alt=""
              width={300}
              height={300}
              priority
            />
          )}
        </div>

        <div className={styles.combined3}>
          <div className={styles.comment8}>
            {session?.user?._id === reply?.userId && (
              <RiDeleteBin5Line
                className={styles.comment10}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteReply();
                }}
              />
            )}

            <div
              className={styles.comment11}
              onClick={(e) => {
                e.stopPropagation();
                likeReply();
              }}
            >
              {liked ? (
                <AiFillHeart className={styles.comment12} />
              ) : (
                <AiOutlineHeart className={styles.comment13} />
              )}

              {reply?.likes && reply?.likes?.length > 0 && (
                <span className={styles.textPink}>{reply?.likes?.length}</span>
              )}
            </div>
            <AiOutlineShareAlt className={styles.comment10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reply;
