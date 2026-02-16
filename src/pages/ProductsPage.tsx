import { useState, useEffect } from 'react';

import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { useCategories } from '../hooks/useCategories';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import SearchBar from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import { useTranslation } from '../hooks/useTranslation';
import { getCategoryLabel } from '../utils/getCategoryLabel';
import { useLanguage } from '../context/LanguageContext';

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
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
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white dark:bg-zinc-900"
        >
          <option value="all">{language === 'es' ? 'Todas' : 'All'}</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {getCategoryLabel(cat, language)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* //! paginado */}
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
    </div>
  );
}
