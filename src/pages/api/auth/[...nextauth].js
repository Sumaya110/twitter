import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/confiig/ConnectDB/ConnectDB";
import { registerWithSns } from "@/libs/services/user-service";
import { loginWithCredentials } from "@/libs/services/user-service";


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