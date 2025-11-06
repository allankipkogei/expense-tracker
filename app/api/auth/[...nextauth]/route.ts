import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"; // <-- THE FIX (uses our new singleton)

export const authOptions = {
  // Use Prisma to store user accounts, sessions, etc.
  adapter: PrismaAdapter(prisma), // <-- This 'prisma' now comes from our import
  
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  // Optional: callbacks for more control
  callbacks: {
    async session({ session, user }) {
      // Add the user's ID to the session object
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };