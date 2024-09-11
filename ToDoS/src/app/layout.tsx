import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { ToastContainer } from 'react-toastify';
import { Rambla } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const rambla_init = Rambla({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-rambla',
});

export const metadata: Metadata = {
  title: 'TodoS',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${rambla_init.variable} bg-background w-screen h-[calc(100dvh)]`}>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
