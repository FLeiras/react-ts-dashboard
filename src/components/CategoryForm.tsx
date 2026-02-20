import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateCategory } from '../hooks/useCreateCategory';

export function CategoryForm() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreateCategory();

  const [form, setForm] = useState({
    nameEn: '',
    nameEs: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => {
        navigate('/products/new');
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4 rounded-xl border p-6"
    >
      <h2 className="text-xl font-semibold">Crear categoría</h2>

      <input
        name="nameEn"
        placeholder="Nombre en inglés"
        value={form.nameEn}
        onChange={handleChange}
        required
        className="w-full rounded-lg border px-3 py-2"
      />

      <input
        name="nameEs"
        placeholder="Nombre en español"
        value={form.nameEs}
        onChange={handleChange}
        required
        className="w-full rounded-lg border px-3 py-2"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-black py-2 text-white disabled:opacity-50"
      >
        {isPending ? 'Creando…' : 'Crear categoría'}
      </button>

      {error && (
        <p className="text-sm text-red-500">Error al crear la categoría</p>
      )}
    </form>
  );
}
