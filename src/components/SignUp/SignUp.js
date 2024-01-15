import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import styles from "@/components/SignUp/SignUp.module.css";

const SignIn = () => {
    const [show, setShow] = useState({ password: false});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };


    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', options);
      const data = await res.json();

      if (data) {
        router.push('http://localhost:3000');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
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
      </form>
    </div>
  );
};

export default SignIn;




//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//     email: "",
//   });

//   const [isSignUp, setIsSignUp] = useState(false);
//   const [isPopUpOpen, setIsPopUpOpen] = useState(false);

//   const handleChange = (e) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isSignUp) {
//       console.log("User signed up:", credentials.email);
//     } else {
//       console.log("User signed in:", credentials.username);
//       signIn("credentials", { ...credentials, callbackUrl: "/home" });
//     }
//   };

//   const toggleSignUp = () => {
//     setIsSignUp((prev) => !prev);
//     setIsPopUpOpen(true);
//   };

//   const handlePopUpClose = (event) => {
//     if (event.target === event.currentTarget) {
//       setIsPopUpOpen(false);
//     }
//   };

//   return (
//     <div className={styles.signinContainer}>
//       <h2 className={styles.signinHeading}>{isSignUp ? "Create Account" : "Sign In"}</h2>

//       {isPopUpOpen && (
//         <div className={styles.overlay} onClick={handlePopUpClose}>
//           <div className={styles.popUpContainer}>
//             <form className={styles.signinForm} onSubmit={handleSubmit}>
             
//               <label className={styles.signinLabel}>
//                 Username:
//                 <input
//                   className={styles.signinInput}
//                   type="text"
//                   name="username"
//                   value={credentials.username}
//                   onChange={handleChange}
//                 />
//               </label>
//               <br />
//               <label className={styles.signinLabel}>
//                 Email:
//                 <input
//                   className={styles.signinInput}
//                   type="email"
//                   name="email"
//                   value={credentials.email}
//                   onChange={handleChange}
//                 />
//               </label>
//               <br />
//               <label className={styles.signinLabel}>
//                 Password:
//                 <input
//                   className={styles.signinInput}
//                   type="password"
//                   name="password"
//                   value={credentials.password}
//                   onChange={handleChange}
//                 />
//               </label>
//               <br />
//               <button className={styles.signinButton} type="submit">
//                 Create Account
//               </button>
//             </form>
//             <button className={styles.closeButton} onClick={handlePopUpClose}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}

//       {isSignUp ? (
//         <button className={styles.signinButton} type="submit">Create Account</button>
//       ) : (
//         <button className={styles.signupButton} onClick={toggleSignUp} style={{ cursor: "pointer" }}>
//           Create a new account
//         </button>
//       )}
//     </div>
//   );
// };


