import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useProducts } from '../hooks/useProducts';
import ThemeToggle from '../components/ThemeToggle';

const ProductsPage = () => {
  const { data, isLoading, isError } = useProducts();
  const [search, setSearch] = useState('');

  if (isLoading) {
    return <p className="p-6">Cargando productos...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Error al cargar productos</p>;
  }

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Productos</h1>
        <ThemeToggle />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 w-full max-w-md rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <Link to={`/product/${product.id}`}>
              <div
                className="
                    border rounded-xl p-4 shadow transition
                    bg-white text-black
                    dark:bg-slate-800 dark:text-white
                  "
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain mb-4"
                />

                <h2 className="font-semibold mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-sm text-gray-600 mb-2">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
