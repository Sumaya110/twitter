import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from "react-icons/ai"
import { BsChat } from "react-icons/bs"
import Moment from "react-moment";
import styles from "@/components/Reply/Reply.module.css";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { updatePost } from "@/libs/action/postAction";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BsArrowReturnRight } from "react-icons/bs";


function Reply({ comment, postId, comments, post, reply }) {
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);

    const { data: session } = useSession()
    const userId = session.user.uid;
    const username = session.user.username;

    const replyId = reply._id;

    console.log("reply  : ", reply)

    useEffect(() => {
        const likes = reply.likes;
        setLikes(likes);
    }, []);

    const handleDeleteReply = async () => {
        try {

            await updatePost(postId, {
                $pull: {
                    replies: { _id: replyId }
                }
            })
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const likeReply = async () => {
        try {
            const likedIndex = reply.likes.findIndex(
                (like) => like.userId === session.user.uid
            );

            if (likedIndex !== -1) {
                post.likes.splice(likedIndex, 1);

                setLiked(false)
            } else {
                setLiked(true);
                reply.likes.push({
                    userId: session.user.uid,
                    username: session.user.username,
                    userImg: session.user.userImg,
                });
            }

            const updatedLikes = reply.likes;
            const updatedReplies = comment.replies.map((c) =>
                c._id === replyId ? { ...c, likes: updatedLikes } : c
            );

            await updatePost(postId, {
                $set: {
                    replies: updatedReplies,
                },
            });

        } catch (error) {
            console.error("Error liking/unliking post:", error);
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
                        {reply?.text}
                    </p>
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