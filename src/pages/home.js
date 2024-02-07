import HomePage from '@/components/HomePage/HomePage';
import { getUserId } from '@/libs/services/user-service';
import { getSession } from 'next-auth/react';

import { getServerSession } from "next-auth";
// import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { authOptions } from './api/auth/[...nextauth]';

const home = ({user}) => {
   return <HomePage user={user} />;
}

export default home

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // const session = await getServerSession(authOptions)
  console.log("gg ", session)
  // let user=null;

  // if(session?.user?._id)
  //  user=await getUserId(session?.user?._id)
  return {
    props: {
      user: user||null,
    },
  };
}

