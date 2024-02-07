import React from "react";
import Index from "@/components/Index/Index";
import { getSession } from "next-auth/react";
import { getUserId } from "@/libs/services/user-service";



const IndexPage = ({ user }) => {
 
  return (
    <div>
      <Index user={user} />
    </div>
  );
};

export default IndexPage;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // const session = await getServerSession(authOptions)


  // let user=null;

  // if(session?.user?._id)
  //  user=await getUserId(session?.user?._id)
  //console.log(session?.user)
  return {
    props: {
      user: user||null,
    },
  };
}
