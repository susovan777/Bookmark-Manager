// Bookmark-Manager\lib\auth.ts
import { db } from './db';
import NextAuth from 'next-auth';
import { compare } from 'bcrypt-ts';
import { ZodError } from 'zod';
import { signInSchema } from './zod';
import Credentials from 'next-auth/providers/credentials';

// Ref: https://authjs.dev/getting-started/installation?framework=pnpm#configure
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          // Step 1: Validate the raw credentials using Zod
          // safeParse never throws — it returns { success, data, error }
          const { data, success } = signInSchema.safeParse(credentials);

          // If validation fails, return null — invalid input
          if (!success) return null;

          // 2. Database Fetch
          // data.email is guaranteed to be a valid email string by Zod
          const user = await db.user.findUnique({
            where: { email: data.email },
          });

          // User not found in DB
          if (!user) return null;

          // User exists but has no password (e.g. signed up via OAuth)
          if (!user.password) return null;

          // Step 3: Compare the provided password with the stored hash
          // data.password is the validated string — use this, not credentials.password
          const isValid = await compare(data.password, user.password);

          if (!isValid) return null;

          // Step 4: Return the user object — it flows into the JWT token
          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          // For any other unexpected error, log it and return null
          // Returning null tells NextAuth the login failed
          console.error('Auth error:', error);
          return null;
        }
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
    // jwt() runs when a token is created or updated
    // We store user.id in the token so we can access it later
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    // session() runs whenever a session is checked (e.g. via auth() or useSession())
    // We copy token.id onto session.user so route handlers can use session.user.id
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});
