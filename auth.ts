import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import User from "./database/db-models/userModel";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        if (typeof credentials.password !== "string") {
          throw new Error("Invalid password format.");
        }

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user && user.password) {
            const verifyPassword = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (verifyPassword) {
              return user;
            } else {
              throw new Error("Invalid password. Try again.");
            }
          } else {
            throw new Error("User not found.");
          }
        } catch (err) {
          console.error(err);
          throw new Error("An unexpected error occurred.");
        }
      },
    }),
  ],
});
