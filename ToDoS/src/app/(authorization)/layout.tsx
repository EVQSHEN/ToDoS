import type { Metadata } from 'next';
import Favicon from '@/app/icon.ico';
import BackgroundAuth from '@/components/BackgroundAuth';
import { ThemeSwitch } from '@/components/ThemeSwitch';

export const metadata: Metadata = {
  icons: [{ rel: 'icon', url: Favicon.src }],
};
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-row w-screen h-[calc(100dvh)]">
      <div className="w-full sm:w-1/2 h-[calc(100dvh)] bg-content1 flex flex-col justify-center items-center z-10 shadow">
        {children}
        <div className="absolute top-7 left-7">
          <ThemeSwitch />
        </div>
      </div>
      <div className="hidden sm:block relative w-1/2 h-full">
        <BackgroundAuth />
      </div>
    </main>
  );
}
