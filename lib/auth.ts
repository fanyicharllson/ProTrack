import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as unknown as PrismaClient),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "joe@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }
        return {
          id: `${existingUser.id}`,
          username: existingUser.username || "",
          email: existingUser.email,
          image: existingUser.image || "",
        };
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      if (trigger === "update") {
        return { ...token, image: user?.image || token.image };
      }
      if (account?.provider === "google" && user) {
        return {
          ...token,
          id: user.id,
          username: user.username || profile?.name,
          email: user.email || profile?.email,
          image: user.image || profile?.image,
        };
      }
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.image || token.image,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          image: token.image as string | null,
        },
      };
    },
    // async signIn({ profile }) {
    //   try {
    //     const existingUser = await db.user.findUnique({
    //       where: { email: profile?.email },
    //     });

    //     if (!existingUser) {
    //       await db.user.create({
    //         data: {
    //           email: profile?.email || "",
    //           username: profile?.name,
    //           image: profile?.image,
    //           password: "google-oauth",
    //         },
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error signing in with Google", error);
    //     return false;
    //   }

    //   return true;
    // },
  },
};
