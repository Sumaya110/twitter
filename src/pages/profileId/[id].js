import Profile from "@/components/Profile/Profile";
import { getUserId } from "@/libs/services/user-service";
import React from "react";
import { getSession } from "next-auth/react";

const Identity = ({ userId, id, profileData, error }) => {
  if (error) {
    console.error("Error fetching profile data:", error);
    return <div>Error: {error}</div>;
  }

  return <Profile userId={userId} id={id} feedUser={profileData} />;
};

export default Identity;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    const userId = session?.user?._id || null;
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
        userId,
        id,
        profileData: serializableProfileData,
      },
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return {
      props: {
        userId: null,
        id: null,
        profileData: null,
        error: "Error fetching profile data",
      },
    };
  }
}
