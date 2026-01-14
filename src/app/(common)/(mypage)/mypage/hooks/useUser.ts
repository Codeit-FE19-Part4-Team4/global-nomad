import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsersMe, updateMe, UpdateUserRequest } from '@/api/users';

/**
 * 내 정보 조회
 */
export function useGetMyInfo() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getUsersMe,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

/**
 * 내 정보 수정
 */
export function useUpdateMyInfo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
}
