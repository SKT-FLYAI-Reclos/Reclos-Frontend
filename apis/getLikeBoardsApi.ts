import { user } from '@/class/user';
import appAxios from './appAxios';
import { TClothKind } from '@/types/clothImageType';

type TGetLikeBoardsResponse = {
  id: number;
  category: 'upper_body' | 'lower_body';
  images: {
    image: string;
    reference_id: number | null;
    kind: TClothKind;
  }[];
}[];

export default function getLikeBoards() {
  return appAxios.get<TGetLikeBoardsResponse>('/api/board/mylike', {
    headers: {
      Authorization: 'Bearer ' + user.getAccessToken(),
    },
  });
}
