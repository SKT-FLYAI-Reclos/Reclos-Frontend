import { user } from '@/class/user';
import appAxios from './appAxios';

export function likeBoard(boardId: number) {
  return appAxios.get(`/api/board/${boardId}/like`, {
    headers: {
      Authorization: `Bearer ${user.getAccessToken()}`,
    },
  });
}
