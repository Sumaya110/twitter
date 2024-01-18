import React, { useContext, useEffect, useState } from 'react'
import { BsChat } from "react-icons/bs"
import { FaRetweet } from "react-icons/fa"
import { AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Moment from 'react-moment'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import styles from "@/components/Post/Post.module.css"


const Post = ({ id, post }) => {

  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState([])

  const { data: session } = useSession()
  const router = useRouter()

  // const [appContext, setAppContext] = useContext(AppContext)

  // useEffect(
  //   () =>
  //     onSnapshot(
  //       query(
  //         collection(db, "posts", id, "comments"),
  //         orderBy("timestamp", "desc")
  //       ),
  //       (snapshot) => setComments(snapshot.docs)
  //     ),
  //   [db, id]
  // )

  // useEffect(
  //   () =>
  //     onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
  //       setLikes(snapshot.docs)
  //     ),
  //   [db, id]
  // )

  // useEffect(() =>
  //   setLiked(
  //     likes.findIndex((like) => like.id === session?.user?.uid) !== -1
  //   ), [likes]
  // )

  // const likePost = async () => {
  //   if (liked) {
  //     await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
  //   } else {
  //     await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
  //       username: session.user.name,
  //     });
  //   }
  // }

  // const openModal = () => {
  //   setAppContext({
  //     ...appContext, 
  //     isModalOpen: true,
  //     post,
  //     postId: id
  //   })

  //   console.log('opening model ', appContext.post);
  // }

  return (
    <div className={styles.combined} onClick={() => router.push(`/${id}`)}>
      <div className={styles.myGridContainer}>

        <div>
          <image className={styles.combined2} src={post?.userImg} alt="" />
        </div>

        <div>
          <div className={styles.combined3}>
            <h1 className={styles.combined4}>{post?.username}</h1>

            <div className={styles.combined5}>
              <p className={styles.combined6}>@{post?.tag} &nbsp;·&nbsp;</p>
              <p className={styles.combined6}>
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </p>
            </div>


          </div>
          <p>{post?.text}</p>
          <image
            className={styles.combined7}
            src={post?.image}
            alt="" />


          <div className={styles.combined8}>

            <div className={styles.combined9}>
              <BsChat className={styles.combined10} onClick={(e) => {
                e.stopPropagation()
                openModal()
              }} />
              {comments.length > 0 && (<span className={styles.textSm}>{comments.length}</span>)}
            </div>

            {session.user.uid !== post?.id ? (
              <FaRetweet className={styles.combined10} />
            ) : (
              <RiDeleteBin5Line className={styles.combined10}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDoc(doc(db, "posts", id));
                }} />
            )}


            <div className={styles.combined11}
              onClick={(e) => {
                e.stopPropagation()
                likePost()
              }}>
              {liked ? <AiFillHeart className={styles.combined12} />
                : <AiOutlineHeart className={styles.combined13} />}

              {/* {likes.length > 0 && (<span className={`${liked && "text-pink-700"} text-sm`}>{likes.length}</span>)} */}
              {/* {likes.length > 0 && (<span className={`${liked }`}>{likes.length}</span>)} */}
            </div>

            <AiOutlineShareAlt className={styles.combined10} />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Post