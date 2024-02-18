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
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const isFollowed = sessionUser?.following?.some(
      (follow) => follow?.userId === user?._id
    );
    setFollowed(isFollowed);
  }, [sessionUser?.following, user?._id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPosts(user._id);
        dispatch(setPosts(data));
        const user_data = await getUser(user?._id);
        dispatch(setUsers(user_data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleFollow = async () => {
    setFollowed(true);

    sessionUser?.following?.push({
      userId: user?._id,
      username: user?.username,
      userImg: user?.userImg,
    });

    await updateUser(sessionUser?._id, {
      following: sessionUser?.following,
    });

    const data = await getUser(sessionUser?._id);
    dispatch(setUsers(data));
  };

  const handleUnfollow = async () => {
    setFollowed(false);

    const updatedFollowing = sessionUser?.following?.filter(
      (follow) => follow?.userId !== user?._id
    );

    await updateUser(sessionUser?._id, {
      following: updatedFollowing,
    });

    const data = await getUser(sessionUser?._id);
    dispatch(setUsers(data));
  };

  return (
    <section className={styles.section}>
      <div className={styles.coverPictureContainer}>
        {user?._id === sessionUser?._id && (
          <div>
            <Image
              src={User?.coverPicture || "/images/TT.png"}
              alt=""
              className={styles.userImage2}
              width={200}
              height={200}
            />
            <div className={styles.profilePictureOverlay}>
              <Image
                src={
                  User?.profilePicture || "/images/blank-profile-picture.webp"
                }
                alt=""
                className={styles.userImage}
                width={200}
                height={200}
              />

              <button
                onClick={() => setShowModal(true)}
                className={styles.button}
              >
                Edit profile
              </button>
            </div>
          </div>
        )}

        {user?._id !== sessionUser?._id && (
          <div>
            <Image
              src={user?.coverPicture || "/images/TT.png"}
              alt=""
              className={styles.userImage2}
              width={200}
              height={200}
            />

            <div className={styles.profilePictureOverlay}>
              <Image
                src={
                  user?.profilePicture || "/images/blank-profile-picture.webp"
                }
                alt=""
                className={styles.userImage}
                width={200}
                height={200}
              />

              {followed ? (
                <button onClick={handleUnfollow} className={styles.button}>
                  Unfollow
                </button>
              ) : (
                <button onClick={handleFollow} className={styles.button}>
                  Follow
                </button>
              )}
            </div>
          </div>
        )}

        {showModal && (
          <ProfileEditModal onClose={() => setShowModal(false)} user={User} />
        )}
      </div>

      <div className={styles.space}>
        {user?._id === sessionUser?._id && (
          <div className={styles.div}>
            <div className={styles.name}>{User?.name}</div>
            <div className={styles.username}>@{User?.username}</div>
          </div>
        )}

        {user?._id !== sessionUser?._id && (
          <div className={styles.div}>
            <div className={styles.name}>{user?.name}</div>
            <div className={styles.username}>@{user?.username}</div>
          </div>
        )}

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
