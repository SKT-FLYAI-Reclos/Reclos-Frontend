import { getCloset } from '@/apis/closetApi';
import QUERY_KEYS from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export default function useCloset(userId: number | null) {
  const {
    data: clothes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_CLOSET],
    queryFn: () => getCloset(userId ?? -1),
    select: (res) => res.data,
    enabled: !!userId,
    // enabled: !!AppUser.user.getAccessToken(),

    // staleTime: 1000 * 60 * 1, // 1분 동안 유효한 데이터
    // refetchInterval: 1000 * 60 * 30, // 30분마다 refetch
    refetchOnMount: 'always',
  });
  return { clothes, isLoading, isError };
}
