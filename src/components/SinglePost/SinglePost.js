import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs"
// import Input from '../Input/Input';
import Post from '../Post/Post';
import Comment from '../Comment/Comment';
import { useRouter } from 'next/router';
import { getPost } from '@/libs/action/postAction';
import styles from "@/components/SinglePost/SinglePost.module.css"

const SinglePost = () => {

    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const router = useRouter()
    // const { id } = router.query;
    // console.log("idd  : ", id )

    useEffect(() => {

      const fetchComments = async () => {
        try {
          const post = await getPost(id)
          const fetchedComments = post.comments;

          setComments(fetchedComments);
          setPost(post);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
      fetchComments();
     
    }, []); 
  

    return (
        <section className={styles.combined}>
            <div className={styles.combined2}>
                <BsArrowLeft className={styles.cursorPointer} onClick={() => router.push(`/`)} />
                Twitter
            </div>

            {/* <Post id={id} post={post} /> */}

            <Post id={id} post={post} />

            <div className={styles.combined3}>
                {comments.length > 0 && (
                    <div className={styles.pb}>
                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                id={comment._id}
                                comment={comment.text}
                            />
                        ))}
                    </div>
                )}
            </div>


        </section>
    )
}

export default SinglePost