import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCategories } from '../hooks/useCategories';
import { useCreateProduct } from '../hooks/useCreateProduct';

export const ProductForm = () => {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const { mutate, isPending, error } = useCreateProduct();

  const [form, setForm] = useState<{
    title: string;
    description: string;
    price: number;
    categoryId: number | '';
    image: File | null;
  }>({
    title: '',
    description: '',
    price: 0,
    categoryId: '',
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', String(form.price));
    formData.append('categoryId', String(form.categoryId));

    if (form.image) {
      formData.append('image', form.image);
    }

    mutate(formData, {
      onSuccess: () => {
        navigate('/');
      },
    });
  };

  return (
    <div className="mx-auto max-w-xl rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="mb-6 text-2xl font-semibold">Crear producto</h2>
        <Link to="/categories/new">
          <button className="px-4 py-2 rounded-lg bg-black text-white">
            Crear categoría
          </button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Título */}
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="mb-1 block text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="mb-1 block text-sm font-medium">Precio</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="mb-1 block text-sm font-medium">Imagen (URL)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                image: e.target.files?.[0] ?? null,
              }))
            }
          />
        </div>

        {/* ⭐ CATEGORÍAS */}
        <div>
          <label className="mb-1 block text-sm font-medium">Categoría</label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Seleccionar categoría</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nameEs}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-600">Error al crear producto</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-black px-4 py-2 text-white"
        >
          {isPending ? 'Creando...' : 'Crear producto'}
        </button>
      </form>
    </div>
  );
};
