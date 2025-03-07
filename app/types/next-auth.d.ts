// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
declare module "next-auth" {
  interface User {
    id: string;
    username: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      username: string;
    };
    expires: string;
  }
}
