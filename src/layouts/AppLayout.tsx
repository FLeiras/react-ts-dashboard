import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors">
      <Header onToggleSidebar={() => setCollapsed((prev) => !prev)} />

      <div className="flex">
        <Sidebar collapsed={collapsed} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
