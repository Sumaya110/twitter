import { useState } from "react";
import styles from "@/components/SignUp/SignUp.module.css";
import { createUser } from "@/libs/action/userAction";

const SignIn = () => {
  const [show, setShow] = useState({ password: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const handleCreate = async () => {
        const userId = await createUser(formData);
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
      </form>
    </div>
  );
};

export default SignIn;

