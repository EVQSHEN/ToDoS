import { ListProvider } from './provider';
import Aside from '@/components/Aside';
import Header from '@/components/Header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ListProvider>
      <div className="sm:flex">
        <Aside />
        <div className="sm:w-[calc(100%-64px)] h-full">
          <Header />
          <main className="h-[calc(100%-64px)] sm:h-[calc(100%-44px)] ">{children}</main>
        </div>
      </div>
    </ListProvider>
  );
}
