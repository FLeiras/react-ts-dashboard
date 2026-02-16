export default function ProductCardSkeleton() {
  return (
    <div className="h-full rounded-xl border p-4 flex flex-col animate-pulse">
      {/* Imagen */}
      <div className="h-40 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />

      {/* Título */}
      <div className="mt-4 flex-1 space-y-2">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2" />
      </div>

      {/* Precio */}
      <div className="mt-4 h-5 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3" />
    </div>
  );
}
