import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postData } from "@/lib/services/api";
import { jwtDecode } from "jwt-decode";

// async function refreshAccessToken() {
//   console.log("refresh token called")
//   try {
//     const res = await getData<{ access_token: string }>("refresh");

//     if (!res.success || !res.data) {
//       throw new Error("Failed to refresh token");
//     }

//     const decodedToken = jwtDecode<{ exp: number }>(res.data.access_token);
//     return {
//       token: res.data.access_token,
//       accessTokenExpires: decodedToken.exp * 1000,
//     };
//   } catch {
//     return null;
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;
        const res = await postData<
          typeof credentials,
          { access_token: string }
        >("login", credentials);
        if (!res.success || !res.data) return null;
        const decodedToken = jwtDecode<{ exp: number }>(res.data.access_token);
        return {
          id: "1",
          name: "mizan",
          email: "mizan@gmail.com",
          token: res.data.access_token,
          accessTokenExpires: decodedToken.exp * 1000,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => (user ? { ...token, ...user } : token),
    session: ({ session, token }) => {
      if (Date.now() > (token.accessTokenExpires as number)) {
        return { ...session, user: undefined };
      }
      return {
        ...session,
        user: {
          id: token.id as string,
          name: token.name,
          email: token.email,
          token: token.token,
        },
      };
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost:true
});
