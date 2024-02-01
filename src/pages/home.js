import HomePage from '@/components/HomePage/HomePage';
import { getSession } from 'next-auth/react';
import React from 'react'


const home = ({user}) => {

   return <HomePage user={user} />;
  
}

export default home

export async function getServerSideProps(context) {
  const session = await getSession(context);
 
  return {
    props: {
      user: session?.user||null,
    },
  };
}