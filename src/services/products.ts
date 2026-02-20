import type { Product } from '../types/Product';
import { http } from '../api/http';
import type { CreateProduct } from '../types/CreateProducts';
import type { Category } from '../types/Category';

const mapProduct = (product: any): Product => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  image: product.image,
  category: product.category?.nameEn ?? 'unknown',
});

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await http.get('/products');
  return data.map(mapProduct);
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await http.get(`/products/${id}`);
  return mapProduct(data);
};

export const createProduct = async (
  payload: CreateProduct,
): Promise<Product> => {
  const { data } = await http.post('/products', payload);
  return data;
};

export async function getCategories(): Promise<Category[]> {
  const { data } = await http.get<Category[]>('/categories');
  return data;
}
