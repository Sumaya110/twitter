import { signIn } from 'next-auth/react';
import React from 'react'; 
import { FcGoogle } from "react-icons/fc";

import { FaXTwitter } from "react-icons/fa6";
import styles from "@/components/Login/Login.module.css"

const Login = () => {
  return (
    <div className={styles.loginContainer}>

      <div className={styles.twitterBg}>
        <FaXTwitter  className={styles.twitterIcon} />
      </div>

      <div className={styles.googleLoginContainer}>
        <div className={styles.googleLoginButton} onClick={() => signIn('google')}>
          <FcGoogle className={styles.googleIcon} />
          SignIn with Google
        </div>
      </div>

    </div>
  );
};

export default Login;
