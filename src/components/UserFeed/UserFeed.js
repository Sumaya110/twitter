import React, { useEffect, useState } from "react";
import styles from "@/components/UserFeed/UserFeed.module.css";
import { getPosts } from "@/libs/action/postAction";
import Post from "../Post/Post";
import "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUsers } from "@/actions/actions";
import Image from "next/image";
import ProfileEditModal from "@/components/EditProfileModal/EditProfileModal";
import { getUser, updateUser } from "@/libs/action/userAction";


const UserFeed = ({ user, sessionUser }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const User = useSelector((state) => state.users.users);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const data = await getPosts(user._id);
      dispatch(setPosts(data));

      const user_data = await getUser(user?.email)
      dispatch(setUsers(user_data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

 

  return (
    <section className={styles.section}>
      <div className={styles.coverPictureContainer}>
        <Image
          src={User?.coverPicture}
          alt=""
          className={styles.userImage2}
          width={200}
          height={200}
        />
        <div className={styles.profilePictureOverlay}>
          <Image
            src={User?.profilePicture}
            alt=""
            className={styles.userImage}
            width={200}
            height={200}
          />

          {user?._id===sessionUser?._id ? ( <button onClick={() => setShowModal(true)} className={styles.button}> Edit profile</button>):(
             <button  className={styles.button}> Follow</button>
          )}

           {/* <button onClick={() => setShowModal(true)} className={styles.button}> Edit profile</button> */}

          {/* {currentUser ? (
            <button onClick={() => setShowModal(true)} className={styles.button}>
              Edit profile
            </button>
          ) : (
            <button onClick={handleFollow} className={styles.button}>
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )} */}

        </div>

        {showModal && (
          <ProfileEditModal
            onClose={() => setShowModal(false)}
            user={User}
          />
        )}
      </div>

      <div className={styles.space}>
        <div className={styles.container}>
          <div>Posts</div>
          <div>Replies</div>
          <div>Highlights</div>
          <div>Media</div>
          <div>Likes</div>
        </div>

        {posts?.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            post={post}
           
            user={User}
            fetchData={() => fetchData()}
          />
        ))}
      </div>
    </section>
  );
};

export default UserFeed;
