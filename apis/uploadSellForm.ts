import { TSellForm } from '@/types/sellFormType';
import appAxios from './appAxios';
import { user } from '@/class/user';

export default function uploadSellForm(sellForm: TSellForm) {
  const formData = new FormData();

  formData.append('gender', sellForm.gender);
  formData.append('size', sellForm.size);
  formData.append('title', sellForm.title as string);
  formData.append('content', sellForm.description as string);
  formData.append('price', String(sellForm.price));

  sellForm.originalClothImgs?.forEach((img) => {
    formData.append('image', img);
    formData.append('kind', 'original');
  });

  // for (const img of sellForm.originalClothImgs as File[]) {
  //   formData.append('image', img);
  //   formData.append('kind', 'original');
  // }

  formData.append('image', sellForm.correctedCloth.image as string);
  formData.append('kind', 'corrected');

  formData.append('category', 'upper_body');

  sellForm.fittingModel.images.forEach((img, i) => {
    if (sellForm.fittingModel.selectedIdx.includes(i)) {
      formData.append('image', img);
      formData.append('kind', 'fitting');
    }
  });

  // for (const img of sellForm.fittingModel.images.filter((_, i) => sellForm.fittingModel.selectedIdx.includes(i))) {
  //   formData.append('image', img);
  //   formData.append('kind', 'fitting');
  // }

  return appAxios.post('/api/board/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + user.getAccessToken(),
    },
  });
}
