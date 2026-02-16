import { Menu } from 'lucide-react';

type Props = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold">React TS Dashboard</h1>
      </div>
    </header>
  );
}
