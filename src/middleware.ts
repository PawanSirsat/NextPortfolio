import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/profile(.*)"]);

export default clerkMiddleware((auth, req) => {
  // Exclude /auth/callback from middleware protection
  if (req.nextUrl.pathname === "/auth/callback") {
    return NextResponse.next();
  }

  // Protect other routes
  if (isProtectedRoute(req)) {
    auth();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
