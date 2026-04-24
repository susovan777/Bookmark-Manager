// Path: components\AuthProvider.tsx

/* SessionProvider must wrap the entire app.
// It stores the session in React context so all child components can access it without prop drilling.

** This is client component because: 
// 1. SessionProvider uses React Context internally
// 2. React Context is NOT available in Server Components
// 3. So we isolate it here and keep layout.tsx as a Server Component
*/

'use client';

import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
};

export default AuthProvider;
