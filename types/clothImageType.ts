type TClothImage = {
  image: string;
  kind: number; // 0 : original(원본), 1 : generated(보정된), 2 : fitted(피팅 모델)
};

export const clothKindMapping = ['original', 'generated', 'fitted'];

export default TClothImage;
