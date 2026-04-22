// Bookmark-Manager\lib\auth.ts
import { db } from './db';
import { compare } from 'bcrypt-ts';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) return null;

        // Return id here — it flows into the JWT token
        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Put user.id into the JWT when signing in
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    // Expose token.id on the session object
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
};

