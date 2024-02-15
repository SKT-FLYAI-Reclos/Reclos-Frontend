export type TSex = 'both' | 'male' | 'female';

export type TSellForm = {
  sex: TSex;
  size: 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
  title: string | null;
  description: string | null;
  price: number | null;
  correctedClothImg: string | null; // 보정된 옷 이미지 url
};
