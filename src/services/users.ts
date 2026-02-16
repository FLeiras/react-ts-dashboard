import type { User } from '../types/User';

const API_URL = 'https://fakestoreapi.com/users';

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Error fetching products');
  }

  return res.json();
};
