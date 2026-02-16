type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm">{label}</span>

      <button
        onClick={onChange}
        className={`
          w-11 h-6 rounded-full transition-colors relative
          ${checked ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-700'}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white
            transition-transform
            ${checked ? 'translate-x-5' : ''}
          `}
        />
      </button>
    </label>
  );
}
