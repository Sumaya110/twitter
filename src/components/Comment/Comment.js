import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai"
import { BsChat } from "react-icons/bs"
import Moment from "react-moment";
import styles from "@/components/Comment/Comment.module.css";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { getPosts, updatePost } from "@/libs/action/postAction";
import Modal from "../Modal/Modal";
import { useState } from "react";
import Reply from "@/components/Reply/Reply"
import { FaEdit } from "react-icons/fa";
import CommentEditModal from "@/components/CommentEditModal/CommentEditModal"
import { setPosts } from "@/actions/actions";
import { useDispatch } from 'react-redux';



function Comment({ comment, postId, comments, post, user , fetchData}) {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();

    const commentId = comment?._id;

    const handleDeleteComment = async () => {
        await updatePost(postId, {
            $pull: {
                comments: { _id: commentId }
            }
        })

        fetchData()
    };

    const likeComment = async () => {
        const likedIndex = comment?.likes?.findIndex(
            (like) => like?.userId === user?._id
        );

        if (likedIndex !== -1) {
            comment?.likes?.splice(likedIndex, 1);
            setLiked(false)
        } else {
            setLiked(true);
            comment?.likes?.push({
                userId: user._id,
                username: user.username,
                userImg: user.userImg,
            });
        }

        const updatedLikes = comment?.likes;
        const updatedComments = post?.comments?.map((c) =>
            c._id === commentId ? { ...c, likes: updatedLikes } : c
        );

        await updatePost(postId, {
            $set: {
                comments: updatedComments,
            },
        });

        const data = await getPosts(user?._id);
        dispatch(setPosts(data));
    };

    return (
        <div className={styles.combined}>

            <div className={styles.commentContainer}>
                <div className={styles.sameSpan}>

                    <Image
                        className={styles.image}
                        src={comment?.userImg}
                        alt={`${comment?.username}'s avatar`}
                        width={40}
                        height={40}
                    />

                    <div className={styles.topBottom}>
                        <span className={styles.userName}>{comment?.username}</span>
                        <span className={styles.tag}>@{comment?.tag}</span>
                    </div>

                    <Moment fromNow className={styles.time}>
                        {comment?.timestamp}
                    </Moment>

                    <FaEdit
                        className={styles.edit}
                        onClick={() => setShowEditModal(true)}
                    />
                    {showEditModal && (
                        < CommentEditModal
                            onClose={() => setShowEditModal(false)}
                            postId={postId}
                            commentId={commentId}
                            post={post}
                            comment={comment}
                            user={user}
                        />
                    )}


                </div>

                <div className={styles.textStyle}>
                    {comment?.text}
                </div>

                {comment?.imageUrl && (
                    <Image
                        className={styles.image2}
                        src={comment?.imageUrl}
                        alt=""
                        width={300}
                        height={300}
                        priority
                    />
                )}
            </div>



            <div className={styles.comment8}>
                <div className={styles.comment9}>
                    <BsChat
                        className={styles.comment10}
                        onClick={() => setShowModal(true)}
                    />
                    {showModal && <Modal onClose={() => setShowModal(false)} id={postId} post={post} comment={comment}  user={user} option={2} />}


                    {comment?.replies?.length > 0 && (
                        <span className={styles.textSm}>{comment?.replies?.length}</span>
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

                    {comment?.likes && comment?.likes?.length > 0 && (
                        <span className={styles.textPink}>{comment?.likes?.length}</span>
                    )}
                </div>
                <AiOutlineShareAlt className={styles.comment10} />
            </div>

            <div className={styles.combined3}>
                {comment?.replies?.length > 0 && (
                    <div className={styles.pb}>
                        {comment?.replies.map((reply) => (

                            <Reply
                                key={reply?._id}
                                comment={comment}
                                postId={postId}
                                comments={comments}
                                post={post}
                                reply={reply}
                                user={user}
                               
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;