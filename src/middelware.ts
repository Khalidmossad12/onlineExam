import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // Handle both development and production token names
  const token =
    request.cookies.get("__Secure-next-auth.session-token") ||
    request.cookies.get("next-auth.session-token");

  console.log("Middleware check - Token:", token);

  if (!token) {
    console.log("No token found. Redirecting to login...");
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  // Token exists, proceed
  return NextResponse.next();
}

// Protect specific routes
export const config = {
  matcher: ["/home", "/dashboard"], // Add more routes if needed
};
