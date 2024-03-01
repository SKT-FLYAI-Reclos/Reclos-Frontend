import { user } from '@/class/user';
import useCloset from '@/hooks/useCloset';
import useLikeBoards from '@/hooks/useLikeBoards';
import cls from '@/libs/cls';
import Image from 'next/image';

export default function SelectLikeClothes({
  selectedClothImg,
  setSelectedClothImg,
  handleTouchClothImg,
  handleResetAllModelImgs,
  clothType,
}: {
  selectedClothImg: string;
  setSelectedClothImg: (img: string) => void;
  handleTouchClothImg: (clothImgUrl: string) => void;
  handleResetAllModelImgs: () => void;
  clothType: 'top' | 'bottom';
}) {
  let { clothes, isLoading } = useLikeBoards();
  const targetCategory = clothType === 'top' ? 'lower_body' : 'upper_body'; // 상의에 대한 게시글이면 하의 옷만 필터링
  clothes = clothes?.filter((board) => board.category === targetCategory);

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
            onClick={() => handleTouchClothImg(cloth.images[0].image)}
            className={cls(
              'relative flex justify-center items-center w-100 h-100 overflow-hidden border-2 border-solid rounded-8 box-border',
              selectedClothImg === cloth.images[0].image ? 'border-indigo-600' : 'border-indigo-50'
            )}
          >
            <Image
              src={cloth.images[0].image}
              alt='피팅 모델에 입혀볼 옷 사진'
              width={100}
              height={100}
              objectFit='contain'
            />
          </button>
        ))}
    </div>
  );
}
