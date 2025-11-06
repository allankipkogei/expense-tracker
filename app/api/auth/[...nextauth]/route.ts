import NextAuth, { AuthOptions, Session, User } from "next-auth" // Import types
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma";

// Explicitly type authOptions
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Add types to session and user here
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user) {
        // You might need to extend the Session type if TypeScript complains about 'id'
        // For now, we'll cast it to avoid complex type augmentation
        (session.user as any).id = user.id; 
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };