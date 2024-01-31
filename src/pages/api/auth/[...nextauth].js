import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/libs/models/userModel";
import connectMongo from "@/confiig/ConnectDB/ConnectDB";
const bcrypt = require('bcrypt')

export const authOptions = {
  providers: [
   
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
       
        connectMongo()
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

     
        const checkPassword = await bcrypt.compare(
          credentials.password,
          result.password
        );

        
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
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
    async session({ session, token }) {
      // session.user.tag = session.user.name
      //   .split(" ")
      //   .join("")
      //   .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);