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

type TGenFittingModelOnBoard = {
  category: 'upper_body' | 'lower_body';
  created_at: string;
  id: number;
  image: string;
  reference_id: string;
  uuid: string;
}[];

export function genFittingModelOnBoard({
  fittingModelRef,
  clothImgUrl,
  category,
}: {
  fittingModelRef: string;
  clothImgUrl: string;
  category: 'upper_body' | 'lower_body';
}) {
  return appAxios.post<TGenFittingModelOnBoard>(
    'api/imgen/ladivtonbyref',
    {
      reference_id: fittingModelRef,
      image: clothImgUrl,
      category,
    },
    {
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
    }
  );
}
