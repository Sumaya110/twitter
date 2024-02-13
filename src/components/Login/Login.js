import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import styles from "@/components/Login/Login.module.css";
import SignUp from "@/components/SignUp/SignUp";
import { useRouter } from "next/router";

const Login = (  ) => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    // console.log("email-password  :", email, password);

    try {
      const status = await signIn("credentials", {
        redirect: false,
        email,
        password,

      });

      // console.log("status  :", status);

      if (!status.ok) {
        console.error("Authentication error:", status.error ?? "Unknown error");
      } else {
        router.push(status.url);
      }
    } catch (error) {
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
{/* 
            {verificationSent && (
              <p> After verification Login here.</p>
            )} */}

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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
