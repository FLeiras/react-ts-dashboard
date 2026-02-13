import type { Product } from '../types/Product';

const API_URL = 'https://fakestoreapi.com/products';

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Error fetching products');
  }

  return res.json();
};

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error('Error al obtener el producto');
  }

  return res.json();
}
