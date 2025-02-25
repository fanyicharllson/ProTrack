import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";

export const auth = () => getServerSession(authOptions);
