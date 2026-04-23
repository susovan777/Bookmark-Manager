// bookmark-manager/app/layout.tsx
import './globals.css';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

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
  title: 'Bookmark Manager',
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
        {/* SessionProvider must wrap your entire app.
          It stores the session in React context so all child components can access it without prop drilling. */}
        <SessionProvider>
          <Toaster /> {children}
        </SessionProvider>
      </body>
    </html>
  );
}
