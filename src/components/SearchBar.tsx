import { Search, X } from 'lucide-react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar...',
}: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-72">
      {/* Icono search */}
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full rounded-lg border
          pl-10 pr-10 py-2
          bg-white dark:bg-zinc-900
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {/* Botón clear */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
