import { Link } from 'react-router-dom';
import { CategoryForm } from '../components/CategoryForm';

export default function CategoryCreatePage() {
  return (
    <div className="space-y-6">
      <Link to="/products" className="text-sm text-zinc-500">
        ← Volver
      </Link>

      <CategoryForm />
    </div>
  );
}
