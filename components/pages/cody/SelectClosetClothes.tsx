import { user } from '@/class/user';
import useCloset from '@/hooks/useCloset';
import cls from '@/libs/cls';
import Image from 'next/image';

export default function SelectClosetClothes({
  selectedClothImg,
  setSelectedClothImg,
  handleTouchClothImg,
  handleResetModelImg,
  handleResetAllModelImgs,
  clothType,
}: {
  selectedClothImg: string;
  setSelectedClothImg: (img: string) => void;
  handleTouchClothImg: (clothImgUrl: string) => void;
  handleResetModelImg: () => void;
  handleResetAllModelImgs: () => void;
  clothType: 'top' | 'bottom';
}) {
  let { clothes, isLoading } = useCloset(user.id);
  // const targetCategory = clothType === 'top' ? 'bottom' : 'top'; // 상의에 대한 게시글이면 하의 옷만 필터링
  const targetCategory = 'top'; // 상의에 대한 게시글이면 하의 옷만 필터링
  clothes = clothes?.filter((cloth) => cloth.cloth_type === targetCategory);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 100px)',
        columnGap: '17px',
        rowGap: '10px',
        justifyItems: 'center',
      }}
      className='px-20'
    >
      {clothes &&
        clothes.map((cloth, i) => (
          <button
            key={i}
            onClick={() => handleTouchClothImg(cloth.image)}
            className={cls(
              'relative flex justify-center items-center w-100 h-100 overflow-hidden border-2 border-solid rounded-8 box-border',
              selectedClothImg === cloth.image ? 'border-indigo-600' : 'border-indigo-50'
            )}
          >
            <Image src={cloth.image} alt='피팅 모델에 입혀볼 옷 사진' width={100} height={100} objectFit='contain' />
          </button>
        ))}
    </div>
  );
}
