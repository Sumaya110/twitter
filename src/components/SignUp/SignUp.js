import { useState } from "react";
import styles from "@/components/SignUp/SignUp.module.css";
import { createUser } from "@/libs/action/userAction";

const SignIn = () => {
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      profilePicture: "",
      coverPicture: "",
      blankPicture: "",
    };

    try {
      const handleCreate = async () => {
        const userId = await createUser(formData);
        setVerificationSent(true);
      };
      handleCreate();
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div>
          <input
            type="name"
            name="name"
            placeholder="name"
            className={styles.inputField}
          />
        </div>

        <div>
          <input
            type="username"
            name="username"
            placeholder="username"
            className={styles.inputField}
          />
        </div>

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
            SignUp
          </button>
        </div>

        {verificationSent && (
          <div className={styles.myElement}>
            A verification mail has been sent.
          </div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
