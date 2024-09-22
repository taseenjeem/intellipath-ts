import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./database/db-models/userModel";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        if (typeof credentials.password !== "string") {
          throw new Error("Invalid password format. Password must be a string");
        }

        try {
          const existingUser = await User.findOne({
            email: credentials?.email,
          });

          if (!existingUser) {
            throw new Error("User email is not found.");
          }

          if (existingUser && existingUser.password) {
            const verifyPassword = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );

            if (verifyPassword) {
              return existingUser;
            } else {
              throw new Error("Invalid password. Try again.");
            }
          } else {
            throw new Error("User not found.");
          }
        } catch (error) {
          console.error(error);
          throw new Error("An unexpected error occurred.");
        }
      },
    }),
  ],
});
