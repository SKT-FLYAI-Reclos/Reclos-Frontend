import TCloth from '@/types/clothType';
import appAxios from './appAxios';

type TGetClosetResponse = {
  image: string;
  cloth_type: TCloth;
}[];

export function getCloset(userId: number) {
  return appAxios.get<TGetClosetResponse>(`/api/user/${userId}/closet`);
}
