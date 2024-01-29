import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import Moment from "react-moment";
import styles from "@/components/Reply/Reply.module.css";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { updatePost } from "@/libs/action/postAction";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

function Reply({ comment, postId, comments, post, reply }) {
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  const { data: session } = useSession();
  const userId = session.user.uid;
  const username = session.user.username;

  const replyId = reply._id;
  const commentId = comment._id;

  useEffect(() => {
    const likes = reply.likes;
    setLikes(likes);
  }, []);

  const handleDeleteReply = async () => {
    try {
      const commentToUpdate = post.comments.find(
        (comment) => comment._id === commentId
      );
      if (commentToUpdate) {
        commentToUpdate.replies = commentToUpdate.replies.filter(
          (reply) => reply._id !== replyId
        );

        await updatePost(postId, { comments: post.comments });
      } else {
        console.error("Comment not found.");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const likeReply = async () => {
    try {
      const commentToUpdate = post.comments.find(
        (comment) => comment._id === commentId
      );

      if (commentToUpdate) {
        const replyToUpdate = commentToUpdate.replies.find(
          (reply) => reply._id === replyId
        );

        if (replyToUpdate) {
          const likedIndex = replyToUpdate.likes.findIndex(
            (like) => like.userId === session.user.uid
          );

          if (likedIndex !== -1) {
            replyToUpdate.likes.splice(likedIndex, 1);
            setLiked(false);
          } else {
            setLiked(true);
            replyToUpdate.likes.push({
              userId: session.user.uid,
              username: session.user.username,
              userImg: session.user.userImg,
            });
          }
          await updatePost(postId, { comments: post.comments });
        } else {
          console.error("Reply not found.");
        }
      } else {
        console.error("Comment not found.");
      }
    } catch (error) {
      console.error("Error liking/unliking reply:", error);
    }
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
              src={reply.userImg}
              alt={`${reply.username}'s avatar`}
              width={40}
              height={40}
            />

            <div className={styles.topBottom}>
              <span className={styles.userName}>{reply.username}</span>
              <span className={styles.tag}>@{reply.tag}</span>
            </div>

            <Moment fromNow className={styles.time}>
              {reply.timestamp}
            </Moment>

            <FaEdit className={styles.edit} />
          </div>

          <div className={styles.text}>{reply?.text}</div>

          {reply.imageUrl && (
                <Image
                  className={styles.image2}
                  src={reply.imageUrl}
                  alt=""
                  width={300}
                  height={200}
                  priority
                />
              )}
        </div>

        <div className={styles.combined3}>
          <div className={styles.comment8}>
            <RiDeleteBin5Line
              className={styles.comment10}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteReply();
              }}
            />

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

              {likes && likes.length > 0 && (
                <span className={styles.textPink}>{likes.length}</span>
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
