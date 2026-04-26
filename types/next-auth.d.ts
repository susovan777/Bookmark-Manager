// types/next-auth.d.ts
import NextAuth, { type DefaultSession } from 'next-auth';
import { type JWT as NextAuthJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  // Returned by `useSession`, `auth`, contains the session data and the user's ID.
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }

  // The shape of the user object returned in the OAuth providers or Credentials `authorize` callback.
  interface User {
    id?: string;
  }
}

declare module 'next-auth/jwt' {
  // Returned by the `jwt` callback and `getToken`, when using JWT sessions
  interface JWT {
    idToken?: string;
  }
}
