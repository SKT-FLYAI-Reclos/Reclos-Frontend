import { TSellForm } from '@/types/sellFormType';

export function generateInitialSellForm(): TSellForm {
  return {
    sex: 'male',
    size: 's',
    title: null,
    price: null,
    description: null,
    correctedCloth: {
      image: null, // 보정된 옷 사진
      uuid: null,
      status: 'beforeGenerated',
    },
    originalClothImgs: null, // 원본 옷 사진
    fittingModel: {
      images: [], // 피팅 모델 이미지
      status: 'beforeGenerated',
      selectedIdx: [],
    },
  };
}
