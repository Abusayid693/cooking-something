import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { verify } from "argon2";

// import { prisma } from "./prisma";
// import { loginSchema } from "./validation/auth";

export const nextAuthOptions: NextAuthOptions = {
  jwt: {
    secret: "super-secret",
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, request) => {
        const creds = credentials;

        console.log("credentials :", creds);

        // const user = await prisma.user.findFirst({
        //   where: { email: creds.email },
        // });

        const user = {
          email: "abusayid693@gmail.com",
          name: "rehan",
          password: "sddas",
          id: "232",
          username: "rehan",
        };

        if (!user) {
          return null;
        }

        const isValidPassword = true;

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("Jwt called");

      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      console.log("Session called");

      //   if (token) {
      //     session.id = token.id;
      //   }

      return session;
    },
  },
};
