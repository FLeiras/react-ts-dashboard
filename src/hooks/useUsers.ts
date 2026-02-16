import { useQuery } from '@tanstack/react-query';

import type { User } from '../types/User';
import { getUsers } from '../services/users';

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};
