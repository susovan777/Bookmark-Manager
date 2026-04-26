// Path: proxy.ts

// Ref: https://authjs.dev/getting-started/session-management/protecting?framework=Next.js#nextjs-proxy

import NextAuth from 'next-auth';
import authConfig from './auth.config';

// Initialize a lightweight NextAuth instance with ONLY the edge-safe config
const { auth } = NextAuth(authConfig);

// Export auth as the proxy function — Auth.js calls authorized() callback
// on every request to decide whether to allow or redirect
export const proxy = auth;

export const config = {
  // Run proxy on all routes EXCEPT Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
