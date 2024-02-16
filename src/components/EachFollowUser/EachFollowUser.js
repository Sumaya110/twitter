import React, { useState } from "react";
import styles from "@/components/EachFollowUser/EachFollowUser.module.css";
import Image from "next/image";
import { getUser, updateUser } from "@/libs/action/userAction";
import { setUsers } from "@/actions/actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const EachFollowUser = ({ fuser, user }) => {
  const router = useRouter();
  const profileId = fuser._id;
  const [followed, setFollowed] = useState(
    user?.following?.some((follow) => follow?.userId === fuser?._id)
  );

  const dispatch = useDispatch();

  const handleFollow = async () => {
    setFollowed(true);

    user?.following?.push({
      userId: fuser?._id,
      username: fuser?.username,
      userImg: fuser?.userImg,
    });

    await updateUser(user?._id, {
      following: user?.following,
    });

    const data = await getUser(user?._id);

    dispatch(setUsers(data));
  };

  const handleUnfollow = async () => {
    setFollowed(false);

    const updatedFollowing = user?.following?.filter(
      (follow) => follow?.userId !== fuser?._id
    );

    await updateUser(user?._id, {
      following: updatedFollowing,
    });

    const data = await getUser(user?._id);
    dispatch(setUsers(data));
  };

  const handleUser = async () => {
    router.push(`/profileId/${profileId}`);
  };

  return (
    <div>
      <div className={styles.userInfo}>
        <Image
          src={fuser?.profilePicture || "/images/blank-profile-picture.webp"}
          alt="Profile"
          className={styles.profilePicture}
          width={40}
          height={40}
        />

        <div className={styles.details}>
          <button className={styles.button} onClick={() => handleUser()}>
            <h3 className={styles.name}>{fuser?.name}</h3>
          </button>
          <p className={styles.username}> @{fuser?.username}</p>
        </div>

        <div className={styles.actions}>
          {followed ? (
            <button
              onClick={() => handleUnfollow()}
              className={styles.unfollowButton}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => handleFollow()}
              className={styles.followButton}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EachFollowUser;
