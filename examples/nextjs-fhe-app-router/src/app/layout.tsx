/**
 * Root Layout
 * Main layout for the Next.js App Router application
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FHEProvider } from '@/components/fhe/FHEProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FHEVM SDK - Next.js App Router Example',
  description: 'Comprehensive FHE integration with Next.js 13+ App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FHEProvider>{children}</FHEProvider>
      </body>
    </html>
  );
}
