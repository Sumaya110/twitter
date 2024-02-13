import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { registerWithSns } from "@/libs/services/user-service";
import { loginWithCredentials } from "@/libs/services/user-service";
// import { verifyEmail } from "@/libs/controllers/userController"; 
import { verifyEmail}  from "@/libs/controllers/userController"


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo();
        try {
          const { email, password } = credentials;
          const user = await loginWithCredentials(email, password);
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],

  callbacks: {

    async signIn(user, account, profile) {

     console.log("user!!!  next-auth :", user);
      // console.log("account:", account);
      // console.log("profile:", profile);
      const isVerified = await verifyEmail(user?.email); // Check if the user's email is verified

      console.log("kkk :: ", isVerified)

      
      if (!isVerified) {
        throw new Error('Email not verified. Please verify your email before signing in.');
      }

      // Continue sign in if email is verified
      return true;
    },

    async session({ session, token }) {
      const result = await registerWithSns({
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
      });

      session.user.username = result?.username;
      session.user.name = result?.name;
      session.user._id = result?._id;

      if (result?.image) {
        session.user.image = result.image;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);




// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectMongo from "@/confiig/ConnectDB/ConnectDB";
// import { registerWithSns } from "@/libs/services/user-service";
// import { loginWithCredentials } from "@/libs/services/user-service";

// export const authOptions = {
//   providers: [
   
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials, req) {
//         connectMongo()
//         try {
//           const { email, password } = credentials;
//           const user = await loginWithCredentials(email, password);
//           return user;
//         } catch (error) {
//           throw new Error(error.message);
//         }
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),

//     GithubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     })
//   ],

//   callbacks: {
//     async session({ session, token }) {
//       const result = await registerWithSns({
//         name: session?.user?.name,
//         email: session?.user?.email,
//         image: session?.user?.image,

//       })

//       session.user.username=result?.username;
//       session.user.name= result?.name;
//       session.user._id= result?._id;

//       if(result?.image)
//       session.user.image= result.image;

//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default NextAuth(authOptions);