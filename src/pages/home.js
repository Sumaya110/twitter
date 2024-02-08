import HomePage from '@/components/HomePage/HomePage';
import { getUserId } from '@/libs/services/user-service';
import { getSession } from 'next-auth/react';
import React from 'react'


const home = ({user}) => {

   return <HomePage user={user} />;
  
}

export default home

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log("session ", session?.user);
  let existUser = null;
  
  if (session?.user?._id) {
    try {
      existUser = await getUserId(session?.user?._id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const serializedUser = existUser ? JSON.parse(JSON.stringify(existUser)) : null;
  // console.log("userrr   ::: ", serializedUser)

  return {
    props: {
      user: serializedUser,
    },
  };
}
