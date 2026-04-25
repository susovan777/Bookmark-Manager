// bookmark-manager/app/layout.tsx

import './globals.css';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import AuthProvider from '@/components/AuthProvider';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Linkmark | Bookmark Manager',
  icons: {
    icon: '/favicon.png',
  },
  description: 'Manage personal bookmarks at one place',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        {/* AuthProvider is a Client Component wrapping the whole app.
            This gives all child components access to:
            - Session (via useSession hook)
            - Toast notifications */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
