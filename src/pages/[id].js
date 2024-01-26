import React, { useContext } from 'react'
import { getSession, useSession } from 'next-auth/react'
import Login from '@/components/Login/Login'
import Id from '@/components/Id/Id'

const PostPage = () => {

  const { data: session } = useSession()

  if (!session) return <Login />

  return (
    <div>

      <Id />

    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session
    },
  };
}


// import React from 'react'

// const [id] = () => {
//   return (
//     <div>[id]</div>
//   )
// }

// export default [id]