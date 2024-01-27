import { BiDotsHorizontalRounded } from "react-icons/bi"
import { AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai"
import { BsBarChart,  BsChatDots } from "react-icons/bs"
import Moment from "react-moment";
import styles from "@/components/Comment/Comment.module.css"
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { updatePost } from "@/libs/action/postAction";

function Comment({comment }) {
    console.log("comment  : ",comment)


    const handleDeleteComment = async () => {
        try {
          console.log("idd  :", id);
          await updatePost(id);
        } catch (error) {
          console.error("Error deleting document:", error);
        }
      };
    return (
        <div className={styles.combined}>
            <div className={styles.pic}>
            <Image
                src={comment?.userImg}
                alt=""
                width={40}
                height={40}
                className={styles.combined2}
            />

            </div>
           
            <div className={styles.combined3}>
                <div className={styles.combined4}>
                    <div className={styles.combined5}>
                        <div className={styles.combined6}>
                            <h4 className={styles.combined7}>
                                {comment?.username}
                            </h4>
                            {/* <span className={styles.combined8}>
                                @{comment?.tag}{" "}
                            </span> */}
                        </div>{" "}
                        ·{" "}
                        <span className={styles.combined9}>
                            <Moment fromNow>{comment?.timestamp}</Moment>
                        </span>
                        <p className={styles.combined10}>
                            {comment?.text}
                        </p>
                    </div>
                    <div className={styles.iconGroup}>
                        <BiDotsHorizontalRounded className={styles.combined11} />
                    </div>
                </div>

                <div className={styles.combined12}>
                    <div className={styles.iconGroup2}>
                        <BsChatDots className={styles.combined13} />
                    </div>

                    <div>
                        <RiDeleteBin5Line  className={styles.combined10}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteComment();
            }}/>
                    </div>

                    <div className={styles.group}>
                        <div className={styles.icon}>
                            <AiOutlineHeart className={styles.combined14} />
                        </div>
                        <span className={styles.combined15}></span>
                    </div>

                    <div className={styles.iconGroup}>
                        <AiOutlineShareAlt className={styles.combined16} />
                    </div>
                    {/* <div className={styles.iconGroup}>
                        <BsBarChart className={styles.combined17} />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Comment;