type TClothImage = {
  image: string;
  reference_id: string | null; // 생성된 fittingModel의 원래 모델(피팅 모델이 아닌 경우 null)
  kind: TClothKind; // 0 : original(원본), 1 : generated(보정된), 2 : fitted(피팅 모델)
};

export type TClothKind = 'original' | 'corrected' | 'ladi_vton';

export const clothKindMapping: TClothKind[] = ['original', 'corrected', 'ladi_vton'];

export default TClothImage;
