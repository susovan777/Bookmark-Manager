// Path: auth.config.ts

// This file contains ONLY edge-compatible config.

import { NextAuthConfig } from 'next-auth';

export default {
  pages: {
    signIn: '/login', // redirect here when unauthenticated
  },

  // The authorized callback runs in the proxy (Edge runtime)
  // It decides whether a request is allowed through or redirected
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isPublicPath =
        nextUrl.pathname.startsWith('/') ||
        nextUrl.pathname.startsWith('/login') ||
        nextUrl.pathname.startsWith('/register') ||
        nextUrl.pathname.startsWith('/api/auth') ||
        nextUrl.pathname.startsWith('/api/register');

      // If accessing a protected route without being logged in → redirect to login
      if (!isLoggedIn && !isPublicPath) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      // If already logged in and visiting login/register → redirect to dashboard
      if (
        isLoggedIn &&
        (nextUrl.pathname === '/login' || nextUrl.pathname === '/register')
      ) {
        return Response.redirect(new URL('/bookmarks', nextUrl));
      }

      // Otherwise allow the request
      return true;
    },
  },

  // Providers array stays empty here — credentials provider needs bcrypt
  // which is also not edge-compatible. It's added in auth.ts below.
  providers: [],
} satisfies NextAuthConfig;
