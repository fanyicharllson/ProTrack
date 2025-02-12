import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
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
          throw new Error("Invalid email or password")
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
         throw new Error("Invalid email or password")
        }
       return {
        id: `${existingUser.id}`,
        username: existingUser.username || '',
        email: existingUser.email,
        image: existingUser.image || '', 
       };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          image: user.image,
        };
      }
      return token;
    },
    async session({ session, token}) {
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
  },
};

