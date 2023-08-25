import NextAuth from "next-auth";
import { MoralisNextAuthProvider } from "@moralisweb3/next";
import axios from "axios";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [MoralisNextAuthProvider()],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user;

        const metamask_address = user.address;

        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/${metamask_address}`);

          if (!response.data.data) {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
              first_name: "",
              last_name: "",
              metamask_address: metamask_address,
              password: process.env.NEXT_PUBLIC_USER_PASSWORD,
              email_address: ""
            });
          }

          const backendResponse = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
            password: process.env.NEXT_PUBLIC_USER_PASSWORD,
            metamask_address: metamask_address
          });

          // Adding the fetchedToken to the user session
          if (backendResponse.data.data && backendResponse.data.data.token) {
            token.fetchedToken = backendResponse.data.data.token;
          }

        } catch (e) {
          console.error(e);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      if (token.fetchedToken) {
        session.user.fetchedToken = token.fetchedToken;
      }
      return session;
    },
    async signIn({ user }) {
      if (user) {
        console.log("user.address", user.address);
        return true;
      } else {
        return false;
      }
    }
  },
});
