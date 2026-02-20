import { Link } from 'react-router-dom';
import type { Product } from '../types/Product';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <div className="h-full rounded-xl border p-4 flex flex-col hover:shadow-md transition">
        {/* Imagen */}
        <div className="h-40 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 mt-4">
          <h3 className="font-medium line-clamp-2">{product.description}</h3>
        </div>

        {/* Precio siempre abajo */}
        <p className="mt-4 font-bold text-lg">${product.price}</p>
      </div>
    </Link>
  );
}
