import { user } from '@/class/user';
import useCloset from '@/hooks/useCloset';
import cls from '@/libs/cls';
import Image from 'next/image';

export default function SelectClosetClothes({
  selectedClothImg,
  setSelectedClothImg,
}: {
  selectedClothImg: string;
  setSelectedClothImg: (img: string) => void;
}) {
  const { clothes, isLoading } = useCloset(user.id);
  function handleClickCloth(cloth: string) {
    setSelectedClothImg(cloth);
    // TODO: 옷 선택 시 피팅 모델 이미지 변경
  }
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
            onClick={() => handleClickCloth(cloth.image)}
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
