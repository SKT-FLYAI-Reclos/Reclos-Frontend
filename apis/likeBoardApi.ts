import { user } from '@/class/user';
import appAxios from './appAxios';

export function likeBoard(boardId: number) {
  return appAxios.post(`/api/board/${boardId}/like`, null, {
    headers: {
      Authorization: `Bearer ${user.getAccessToken()}`,
    },
  });
}
