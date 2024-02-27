import { user } from '@/class/user';
import appAxios from './appAxios';

type TGetClosetResponse = {
  id: string;
  image: string;
  created_at: string;
  user: number;
};

export default function removeBgApi(image: File) {
  const formData = new FormData();
  formData.append('image', image);
  return appAxios.post<TGetClosetResponse>('api/imgen/rmbg', formData, {
    headers: {
      Authorization: `Bearer ${user.getAccessToken()}`,
    },
  });
}
