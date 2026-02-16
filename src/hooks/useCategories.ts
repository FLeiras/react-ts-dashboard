import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/products';

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};
