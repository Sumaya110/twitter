import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import styles from "@/components/Login/Login.module.css";
import SignUp from "@/components/SignUp/SignUp";
import { useRouter } from "next/router";

const Login = (  ) => {
  const router = useRouter();
  const [error, setError ]=useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const status = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("status  :", status);

      if (!status.ok) {
        setError("Please verify before Login!");
        console.error("Authentication error:", status.error ?? "Unknown error");
      } else {
        router.push(status.url);
      }
    } catch (error) {
 
      setError("Please verify before Login!");
      console.error("Unexpected error during authentication:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>

      <div className={styles.twitterBg}>
        <FaXTwitter className={styles.twitterIcon} />
      </div>

      <div className={styles.happeningNowContainer}>
        <p className={styles.upper}>Happening now</p>
        <p className={styles.lower}>Join today.</p>

        <div className={styles.googleSignupContainer}>
          <button
            className={styles.googleLoginButton}
            onClick={() => {
              signIn("google");
            }}
          >
            <FcGoogle className={styles.googleIcon} />
            Sign up with Google
          </button>

          <button
            className={styles.githubLoginButton}
            onClick={() => {
              signIn("github");
            }}
          >
            <FaGithub className={styles.githubIcon} />
            Sign up with GitHub
          </button>

          <SignUp />
        </div>

        <div className={styles.container}>
          <div className={styles.signUpLink}>
            <p>Already have an account?</p>



            <form className={styles.loginForm} onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.inputField}
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={styles.inputField}
                />
              </div>

              <div>
                <button type="submit" className={styles.loginButton}>
                  Sign in
                </button>
              </div>

              {error && (
              <p className={styles.error}>{error}</p>
            )}
            </form>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
