export type TSex = 'both' | 'male' | 'female';
export type TSize = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type TGenerateStatus = 'beforeGenerated' | 'loading' | 'generated' | 'error';
export type TFittingModel = {
  images: string[]; // 착용 모델 이미지 url
  status: TGenerateStatus | 'selected';
  selectedIdx: number[];
};

export type TSellForm = {
  sex: TSex;
  size: TSize;
  title: string | null;
  description: string | null;
  price: number | null;
  correctedCloth: {
    image: string | null;
    status: TGenerateStatus;
  }; // 보정된 옷 이미지 url
  originalClothImgs: File[] | null; // 원본 옷 이미지 url
  fittingModel: TFittingModel;
};
