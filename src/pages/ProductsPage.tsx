import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import SearchBar from '../components/SearchBar';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import { useCategories } from '../hooks/useCategories';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';
import { getCategoryLabel } from '../utils/getCategoryLabel';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<'all' | number>(
    'all',
  );

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  //! reset de página al filtrar
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + ITEMS_PER_PAGE,
  );

  const hasProducts = products.length > 0;
  const hasFilteredProducts = filteredProducts.length > 0;
  const showPagination = hasFilteredProducts && totalPages > 1;

  return (
    <div className="space-y-6">
      {/* //! filtro */}
      <div className="flex items-center gap-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={t.products.searchPlaceholder}
        />
        <label className="text-sm text-zinc-500">
          {t.products.categories}:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value === 'all' ? 'all' : Number(e.target.value),
            )
          }
        >
          <option value="all">{language === 'es' ? 'Todas' : 'All'}</option>

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {getCategoryLabel(cat, language)}
            </option>
          ))}
        </select>
        {hasProducts && (
          <Link to="/products/new">
            <button>Crear producto</button>
          </Link>
        )}
      </div>
      {!isLoading && hasProducts && !hasFilteredProducts && (
        <div className="flex justify-center py-16">
          <p className="text-zinc-500 text-lg">
            {language === 'es'
              ? 'No se encontraron productos con esos filtros'
              : 'No products match your filters'}
          </p>
        </div>
      )}

      {!isLoading && !hasProducts && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <p className="text-zinc-500 text-lg">
            {language === 'es'
              ? 'No hay productos cargados todavía'
              : 'No products yet'}
          </p>

          <Link to="/products/new">
            <button className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">
              {language === 'es'
                ? 'Crear primer producto'
                : 'Create first product'}
            </button>
          </Link>
        </div>
      )}

      {hasFilteredProducts && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      )}

      {/* //! paginado */}
      {showPagination && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            ← {t.paginated.previus}
          </button>

          <span className="text-sm text-zinc-500">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            {t.paginated.next} →
          </button>
        </div>
      )}
    </div>
  );
}
