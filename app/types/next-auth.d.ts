import NextAuth from "next-auth";
declare module "next-auth" {
  interface User {
    username: string;
  }

  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      username: string;
    };
    expires: string;
  }
}
