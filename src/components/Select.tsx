type Option<T extends string> = {
  value: T;
  label: string;
};

type SelectProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export default function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: SelectProps<T>) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-sm">{label}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="rounded-lg border px-3 py-2 bg-white dark:bg-zinc-900"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
