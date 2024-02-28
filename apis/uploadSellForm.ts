import { TSellForm } from '@/types/sellFormType';
import appAxios from './appAxios';
import { user } from '@/class/user';

type TUploadSellFormResponse = {
  id: number; // 게시글 id
};

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
    formData.append('reference_id', ''); // 빈 문자열 -> None
  });

  formData.append('image', sellForm.correctedCloth.image as string);
  formData.append('kind', 'corrected');
  formData.append('reference_id', '');

  formData.append('category', 'upper_body');

  sellForm.fittingModel.images.forEach((img, i) => {
    if (sellForm.fittingModel.selectedIdx.includes(i)) {
      formData.append('image', img.url);
      formData.append('kind', 'fitting');
      formData.append('reference_id', img.refId);
    }
  });

  return appAxios.post<TUploadSellFormResponse>('/api/board/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + user.getAccessToken(),
    },
  });
}
