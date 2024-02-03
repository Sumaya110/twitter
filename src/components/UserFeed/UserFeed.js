import React, { useEffect, useState } from "react";
import styles from "@/components/UserFeed/UserFeed.module.css";
import { getPosts } from "@/libs/action/postAction";
import Post from "../Post/Post";
import "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setUsers } from "@/actions/actions";
import Image from "next/image";
import ProfileEditModal from "@/components/EditProfileModal/EditProfileModal";
import { getUser } from "@/libs/action/userAction";

const UserFeed = ({ user, pic }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchData();
    // fetchUser();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getPosts(user._id);
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getUser(user.email);

      console.log("data  :", data)
      dispatch(setUsers(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.coverPictureContainer}>
        <Image
          src={user?.coverPicture}
          alt=""
          className={styles.userImage2}
          width={200}
          height={200}
        />
        <div className={styles.profilePictureOverlay}>
          <Image
            src={user?.profilePicture}
            alt=""
            className={styles.userImage}
            width={200}
            height={200}
          />

          <button onClick={() => setShowModal(true)} className={styles.button}> Edit profile</button>
        </div>

        {showModal && (
          <ProfileEditModal
            onClose={() => setShowModal(false)}
            user={user}
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
            pic={pic}
            user={user}
            fetchData={() => fetchData()}
          />
        ))}
      </div>
    </section>
  );
};

export default UserFeed;
