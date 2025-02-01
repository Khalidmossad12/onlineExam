// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    token?: string; // Add the token property to the Session type
  }

  interface User {
    token?: string; // Optional: Add token to the User type if needed
  }

  interface JWT {
    token?: string; // Optional: Add token to the JWT type if needed
  }

  interface Quiz {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
  }
}