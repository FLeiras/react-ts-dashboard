import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/products';
import type { Product } from '../types/Product';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getProductById(id)
      .then(setProduct)
      .catch(() => setError('No se pudo cargar el producto'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-zinc-500">Cargando producto...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm text-zinc-500 hover:underline">
        ← Volver
      </Link>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex items-center justify-center bg-white rounded-xl border p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <p className="text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>

          <p className="text-2xl font-bold">${product.price}</p>
        </div>
      </div>
    </div>
  );
}
