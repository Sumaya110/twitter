// import { BiDotsHorizontalRounded } from "react-icons/bi"
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai"
import { BsChat } from "react-icons/bs"
import Moment from "react-moment";
import styles from "@/components/Comment/Comment.module.css";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getPost, updatePost } from "@/libs/action/postAction";
import Modal from "../Modal/Modal";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Reply from "@/components/Reply/Reply"
import { BsArrowReturnRight } from "react-icons/bs";


function Comment({ comment, postId, comments, post }) {
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [replies, setReplies] = useState([]);

    const { data: session } = useSession()
    const userId = session.user.uid;
    const username = session.user.username;

    const commentId = comment._id;

    useEffect(() => {
        const likes = comment.likes;
        setLikes(likes);

        const replies = comment.replies;
        setReplies(replies)
    }, []);



    const handleDeleteComment = async () => {
        try {

            await updatePost(postId, {
                $pull: {
                    comments: { _id: commentId }
                }
            })
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const likeComment = async () => {
        try {
            const likedIndex = comment.likes.findIndex(
                (like) => like.userId === session.user.uid
            );

            if (likedIndex !== -1) {
                post.likes.splice(likedIndex, 1);

                setLiked(false)
            } else {
                setLiked(true);
                comment.likes.push({
                    userId: session.user.uid,
                    username: session.user.username,
                    userImg: session.user.userImg,
                });
            }

            const updatedLikes = comment.likes;
            const updatedComments = post.comments.map((c) =>
                c._id === commentId ? { ...c, likes: updatedLikes } : c
            );

            await updatePost(postId, {
                $set: {
                    comments: updatedComments,
                },
            });

        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    return (
        <div className={styles.combined}>
            {/* <BsArrowReturnRight /> */}


            <div className={styles.commentContainer}>
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

                <p className={styles.combined10}>
                    {comment?.text}
                </p>
            </div>



            <div className={styles.comment8}>
                <div className={styles.comment9}>
                    <BsChat
                        className={styles.comment10}
                        onClick={() => setShowModal(true)}
                    />
                    {showModal && <Modal onClose={() => setShowModal(false)} id={postId} post={post} comment={comment} option={2} />}


                    {replies.length > 0 && (
                        <span className={styles.textSm}>{replies.length}</span>
                    )}
                </div>

                <RiDeleteBin5Line
                    className={styles.comment10}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteComment();
                    }}
                />

                <div
                    className={styles.comment11}
                    onClick={(e) => {
                        e.stopPropagation();
                        likeComment();
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

            <div className={styles.combined3}>
                {replies.length > 0 && (
                    <div className={styles.pb}>
                        {replies.map((reply) => (

                            <Reply
                                key={reply._id}
                                comment={comment}
                                postId={postId}
                                comments={comments}
                                post={post}
                                reply={reply}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* </div> */}


        </div>
    );
}

export default Comment;