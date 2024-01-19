import React from 'react';
import Index from '@/components/Index/Index';
import { getSession } from 'next-auth/react';

const IndexPage = ({ user }) => {
  
  console.log("index page user : ", user)
  return <Index user={user} />;
};

export default IndexPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      user: session?.user||null,
    },
  };
}
