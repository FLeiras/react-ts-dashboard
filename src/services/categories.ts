import { http } from '../api/http';
import type { Category } from '../types/Category';

export type CreateCategoryDTO = {
  nameEn: string;
  nameEs: string;
};

export const createCategory = async (
  data: CreateCategoryDTO,
): Promise<Category> => {
  const res = await http.post('/categories', data);
  return res.data;
};
