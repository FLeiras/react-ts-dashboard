import { categoryTranslations } from '../i18n/categories';

type Language = 'en' | 'es';
type CategoryKey = keyof typeof categoryTranslations;

export function getCategoryLabel(category: string, language: Language) {
  if (category in categoryTranslations) {
    return categoryTranslations[category as CategoryKey][language];
  }

  return category;
}
