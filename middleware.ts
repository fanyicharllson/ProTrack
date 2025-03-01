import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const publicRoutes = ["/sign-in", "/sign-up"];

  if (token) {
    // If authenticated and trying to access the root, send to dashboard
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    // If not authenticated and trying to access protected routes
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/sign-up", req.url));
    }
  }

  return NextResponse.next();
}

// Ensure middleware applies only where needed
export const config = {
  matcher: ["/", "/dashboard", "/project", "/sign-in", "/sign-up", "/settings", "/help", "/goals", "/analitics"],
};
