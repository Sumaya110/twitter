import Profile from '@/components/Profile/Profile';
import { getUserId } from '@/libs/services/user-service';
import React from 'react';

const Identity = ({ id, profileData, error }) => {
  if (error) {
    console.error("Error fetching profile data:", error);
    return <div>Error: {error}</div>;
  }

  return <Profile profileId={id} profileData={profileData} />;
};

export default Identity;

export async function getServerSideProps(context) {
  try {
    const id = context.query.id;
    // console.log("id  : ", id);
    const profileData = await getUserId(id);

    const serializableProfileData = {
      _id: profileData._id.toString(),
      username: profileData.username,
      email: profileData.email,
      profilePicture: profileData.profilePicture,
      coverPicture: profileData.coverPicture,
    };

    return {
      props: {
        id,
        profileData: serializableProfileData,
      },
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      props: {
        id: null,
        profileData: null,
        error: "Error fetching profile data",
      },
    };
  }
}
