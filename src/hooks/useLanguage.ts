import { useEffect, useState } from 'react';

export type Language = 'es' | 'en';

const STORAGE_KEY = 'language';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'es' ? stored : 'es';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  return {
    language,
    setLanguage,
  };
}
