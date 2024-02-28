type TClothImage = {
  image: string;
  kind: TClothKind; // 0 : original(원본), 1 : generated(보정된), 2 : fitted(피팅 모델)
};

export type TClothKind = 'original' | 'corrected' | 'fitting';

export const clothKindMapping: TClothKind[] = ['original', 'corrected', 'fitting'];

export default TClothImage;
