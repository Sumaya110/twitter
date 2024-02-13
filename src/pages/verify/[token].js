import { useRouter } from 'next/router';
import { useEffect } from 'react';


function VerifyPage({ message }) {
  const router = useRouter();

  useEffect(() => {
    if (message === 'Verification successful') {
      router.push('/home');
    }
  }, [message, router]);

  return <div>{message}</div>;
}



export async function getServerSideProps({ query }) {
  const { token } = query;
  try {
    const response = await fetch(`/api/users/verify/${token}`);
    const data = await response.json();
    return { props: { message: data.message } };
  } catch (error) {
    console.error('Error verifying user:', error);
    return { props: { message: 'Error verifying user' } };
  }
}

export default VerifyPage;
