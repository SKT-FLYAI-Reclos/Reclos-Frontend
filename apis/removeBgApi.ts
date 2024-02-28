import { user } from '@/class/user';
import appAxios from './appAxios';
import axios from 'axios';

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

export async function removeBgApiAll(images: File[]) {
  const urls: string[] = [];
  // images.forEach(async (image) => {
  //   // removeBgApi(image).then((res) => {
  //   //   urls.push(res.data.image);
  //   // });
  //   const response = await removeBgApi(image);
  //   urls.push(response.data.image);
  // });

  for (const image of images) {
    const response = await removeBgApi(image);
    urls.push(response.data.image);
  }

  return urls;
}
