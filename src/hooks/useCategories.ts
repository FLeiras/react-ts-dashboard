import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/products';
import type { Category } from '../types/Category';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
