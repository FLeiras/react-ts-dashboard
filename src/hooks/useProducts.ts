import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductById } from '../api/products';
import type { Product } from '../types/Product';

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
