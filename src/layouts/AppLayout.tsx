import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <div
      className="
        min-h-screen
        bg-white text-black
        dark:bg-zinc-900 dark:text-white
        transition-colors
      "
    >
      {children}
    </div>
  );
}
