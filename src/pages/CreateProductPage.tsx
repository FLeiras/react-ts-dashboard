import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { ProductForm } from '../components/ProductForm';

export default function CreateProductPage() {
  const { data: categories = [], isLoading } = useCategories();

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <h2 className="text-xl font-semibold">
          Primero necesitás crear una categoría
        </h2>

        <p className="text-zinc-500">
          Un producto debe pertenecer a una categoría.
        </p>

        <Link to="/categories/new">
          <button className="px-4 py-2 rounded-lg bg-black text-white">
            Crear categoría
          </button>
        </Link>
      </div>
    );
  }

  const { id } = categories[0];

  return <ProductForm categoryId={id} />;
}
