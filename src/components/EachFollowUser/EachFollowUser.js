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
    setFollowed(true)
    console.log("follow ")
    user?.following?.push({
      userId: fuser?._id,
      username: fuser?.username,
      userImg: fuser?.userImg,
    });

    await updateUser(user?._id, {
      following: user?.following,
    });

    const data = await getUser(user?.email);

    dispatch(setUsers(data));

  };



  const handleUnfollow = async () => {

    setFollowed(false)
    console.log("unfollow")

    const updatedFollowing = user?.following?.filter(
      (follow) => follow?.userId !== fuser?._id
    );

    await updateUser(user?._id, {
      following: updatedFollowing,
    });

    const data = await getUser(user?.email);
    dispatch(setUsers(data));

  };

  const handleUser = async () => {
    router.push(`/profileId/${profileId}`);
  };

  return (
    <div>

      <button className={styles.userInfo} onClick={handleUser}>
        
        <Image
          src={fuser?.profilePicture}
          alt="Profile"
          className={styles.profilePicture}
          width={40}
          height={40}
        />
        <div className={styles.details}>

          <h3 className={styles.name}>{fuser?.name}</h3>
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
        
      </button>
    </div>
  );
};

export default EachFollowUser;
