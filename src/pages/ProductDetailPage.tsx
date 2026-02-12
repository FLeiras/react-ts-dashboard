import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const { data, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return <p className="p-6">Cargando producto...</p>;
  }

  if (isError || !data) {
    return <p className="p-6 text-red-500">Producto no encontrado</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white">
      <div className="p-6 max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:underline"
        >
          ← Volver
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-80 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold mb-4">{data.title}</h1>

            <p className="text-gray-600 mb-4">{data.description}</p>

            <p className="text-xl font-semibold mb-2">${data.price}</p>

            <span className="inline-block bg-gray-200 text-sm px-3 py-1 rounded">
              {data.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
