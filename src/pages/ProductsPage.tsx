import { useProducts } from '../hooks/useProducts';

const ProductsPage = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return <p className="p-6">Cargando productos...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Error al cargar productos</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-contain mb-4"
            />

            <h2 className="font-semibold mb-2 line-clamp-2">{product.title}</h2>

            <p className="text-sm text-gray-600 mb-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
