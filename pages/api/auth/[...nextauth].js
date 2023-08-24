import NextAuth from "next-auth";
import { MoralisNextAuthProvider } from "@moralisweb3/next";
import axios from "axios";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [MoralisNextAuthProvider()],
  // adding user info to the user session object
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.user = user;
        // check if user is new, if they will need to add to database

        console.log("token", token);
        console.log("user.address", user.address);

        const metamask_address = user.address;

        const connectBackend = async () => {
          await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
            password: process.env.NEXT_PUBLIC_USER_PASSWORD,
            metamask_address: metamask_address
          }, {
            withCredentials: true
          }).then((response) => {
            console.log(response.data.data.token);
            return response.data.data.token;
          }).catch((err) => console.error(err))
        }

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

            const backendToken = await connectBackend();
            if (backendToken) {
              token.accessToken = backendToken;
            }

            connectBackend();
          } else {
            connectBackend();
          }
        } catch (e) {
          console.error(e);
        }
        return token;
      }
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendToken = token.accessToken;
      return session;
    },
  },
});