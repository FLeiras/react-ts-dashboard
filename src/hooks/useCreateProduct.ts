import { useMutation } from '@tanstack/react-query';
import { http } from '../api/http';

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      http.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
  });
};
