// app\api\auth\[...nextauth]\route.ts
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Ref: https://next-auth.js.org/configuration/initialization#route-handlers-app
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
