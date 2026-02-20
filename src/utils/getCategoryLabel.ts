import type { Category } from '../types/Category';

export function getCategoryLabel(category: Category, language: 'es' | 'en') {
  return language === 'es' ? category.nameEs : category.nameEn;
}
