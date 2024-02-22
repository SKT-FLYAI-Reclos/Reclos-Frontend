import axios, { AxiosResponse } from 'axios';
import appAxios from './appAxios';
import { user } from '@/class/user';

export default async function postAddClothes({
  topClothes,
  bottomClothes,
}: {
  topClothes: File[];
  bottomClothes: File[];
}): Promise<AxiosResponse<any, any>[]> {
  return await axios.all(
    Array.from(topClothes)
      .map((f) => {
        const formData = new FormData();
        formData.append('image', f);
        formData.append('cloth_type', 'top');
        return appAxios.post(`/api/user/${user.id}/closet/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.getAccessToken()}` },
        });
      })
      .concat(
        Array.from(bottomClothes).map((f) => {
          const formData = new FormData();
          formData.append('image', f);
          formData.append('cloth_type', 'bottom');
          return appAxios.post(`/api/user/${user.id}/closet/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${user.getAccessToken()}` },
          });
        })
      )
  );
}

// api/user/:id/closet
// image: FormData
// cloth_type: string
