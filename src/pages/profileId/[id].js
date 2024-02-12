import Profile from '@/components/Profile/Profile';
import { getUserId } from '@/libs/services/user-service';
import React from 'react';
import { getSession } from "next-auth/react";
// import { getUserId } from "@/libs/services/user-service";


const Identity = ({ user_email, id, profileData, error }) => {
  if (error) {
    console.error("Error fetching profile data:", error);
    return <div>Error: {error}</div>;
  }

  return <Profile user_email={user_email} id={id} feedUser={profileData}  />;
};

export default Identity;

export async function getServerSideProps(context) {

  const session = await getSession(context);
 
  

  try {
    const user_email= session?.user?.email || null;
    const id = context.query.id;
    const profileData = await getUserId(id);

    const serializableProfileData = {
      _id: profileData._id.toString(),
      username: profileData.username,
      name: profileData.name,
      email: profileData.email,
      profilePicture: profileData.profilePicture,
      coverPicture: profileData.coverPicture,
    };

    return {
      props: {
        user_email,
        id,
        profileData: serializableProfileData,
      },
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      props: {
        user_email: null,
        id: null,
        profileData: null,
        error: "Error fetching profile data",
      },
    };
  }
}
