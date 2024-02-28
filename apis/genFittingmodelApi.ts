import { user } from '@/class/user';
import appAxios from './appAxios';

type TGenFittingmodelResponse = {
  uuid: string;
  category: 'upper_body' | 'lower_body';
  image: string;
  created_at: string;
  user: number;
  reference_id: string;
}[];

export default function genFittingmodel({ uuid, reference_count }: { uuid: string; reference_count: number }) {
  return appAxios.post<TGenFittingmodelResponse>(
    'api/imgen/ladivton',
    {
      uuid,
      category: 'upper_body', // 추후에 클러스터링 모델 적용
      reference_count,
    },
    {
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
    }
  );
}
