import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

type Props = {
  onToggleSidebar: () => void;
};

export default function Header({ onToggleSidebar }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold">React TS Dashboard</h1>
      </div>

      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                   bg-zinc-200 hover:bg-zinc-300
                   dark:bg-zinc-700 dark:hover:bg-zinc-600
                   transition-colors"
      >
        {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        {theme === 'dark' ? 'Dark' : 'Light'}
      </button>
    </header>
  );
}
