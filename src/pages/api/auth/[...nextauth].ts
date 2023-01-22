import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import utils from "@/lib/utils";
import bcrypt from "bcryptjs";
import { log } from "console";

export const authOptions = {
  providers: [
    CredentialsProvider({
      session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        strategy: "jwt",
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
          return randomUUID?.() ?? randomBytes(32).toString("hex");
        },
      },
      async authorize(credentials, req) {
        try {
          // Look up a unique admin in the database based on the email field sumitted in the body
          const admin = await utils.prisma.admin.findUnique({
            where: {
              email: credentials.email,
            },
          });
          // Compare the password with the encrypted one
          const match = await bcrypt.compare(credentials.password, admin.password);
          // If no error and we have user data, return it
          if (match) {
            return admin;
          }
          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.log(error);
        }
      },
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true;
        },
        async redirect({ url, baseUrl }) {
          return baseUrl;
        },
        async session({ session, user, token }) {
          return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
          return token;
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
