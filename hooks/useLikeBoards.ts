import { getCloset } from '@/apis/closetApi';
import getLikeBoards from '@/apis/getLikeBoardsApi';
import QUERY_KEYS from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export default function useLikeBoards() {
  const {
    data: clothes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_LIKE_BOARDS],
    queryFn: getLikeBoards,
    select: (
      res // 보정된 옷만 필터링
    ) => res.data.filter((board) => ({ ...board, images: board.images.filter((image) => image.kind === 'corrected') })),
    // enabled: !!AppUser.user.getAccessToken(),

    // staleTime: 1000 * 60 * 1, // 1분 동안 유효한 데이터
    // refetchInterval: 1000 * 60 * 30, // 30분마다 refetch
    refetchOnMount: 'always',
  });
  return { clothes, isLoading, isError };
}
