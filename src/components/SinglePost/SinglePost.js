import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs"
// import Input from '../Input/Input';
import Post from '../Post/Post';
import Comment from '../Comment/Comment';
import { useRouter } from 'next/router';

const SinglePost = () => {

    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const router = useRouter()
    // const { id } = router.query;
    // console.log("idd  : ", id )

    useEffect(() => {

      const fetchComments = async () => {
        try {
          // const commentsCollection = getComments()
          const fetchedComments = await commentsCollection.find({ postId: ObjectId(id) }).sort({ timestamp: -1 }).toArray();
          setComments(fetchedComments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };
  
      const fetchPostData = async () => {
        try {
          const postsCollection = db.collection('posts');
          const fetchedPost = await postsCollection.findOne({ _id: ObjectId(id) });
          setPost(fetchedPost);
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      };
  
      fetchComments();
      fetchPostData();
    }, []); 
  

    return (
        <section className='sm:ml-[81px] xl:ml-[340px] w-[600px] min-h-screen border-r border-gray-400 text-white py-2'>
            <div className='sticky top-0 bg-black flex items-center gap-4 font-medium text-[20px] px-4 py-2'>
                <BsArrowLeft className='cursor-pointer' onClick={() => router.push(`/`)} />
                Twitter
            </div>

            {/* <Post id={id} post={post} /> */}

            <div className='border-t border-gray-700'>
                {comments.length > 0 && (
                    <div className="pb-72">
                        {comments.map((comment) => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                comment={comment.data()}
                            />
                        ))}
                    </div>
                )}
            </div>


        </section>
    )
}

export default SinglePost