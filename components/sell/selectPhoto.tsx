import { useRef } from 'react';
import PrevBtn from '../navbar/prevBtn';
import TopNavbar from '../navbar/topNavbar';
import Image from 'next/image';

export default function SelectPhoto({
  toPrev,
  toNext,
  correctClothImg,
  setCorrectedClothImg,
}: {
  toPrev: () => void;
  toNext: () => void;
  correctClothImg: File | null;
  setCorrectedClothImg: (img: File) => void;
}) {
  console.log(correctClothImg);
  return (
    <>
      <TopNavbar left={<PrevBtn title='Back' onClick={toPrev} />} />
      {!correctClothImg ? (
        <BeforeSelectPhoto setCorrectedClothImg={setCorrectedClothImg} />
      ) : (
        <AfterSelectPhoto correctClothImg={correctClothImg} />
      )}
    </>
  );
}

function BeforeSelectPhoto({ setCorrectedClothImg }: { setCorrectedClothImg: (img: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <main className='flex flex-col items-center justify-center h-[calc(100vh-64px)] relative'>
      <div className='px-40'>Reclos에서는 피팅 모델을 생성할 수 있어요. 옷을 앞 뒤로 찍어봐요 ..... 어쩌고 저쩌고</div>
      <button
        onClick={() => inputRef.current?.click()}
        className='py-10 px-20 text-16 rounded-4 bg-green-500 text-white absolute bottom-50'
      >
        생성하기
      </button>
      <input
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files) {
            setCorrectedClothImg(e.target.files[0]);
          }
        }}
        type='file'
        accept='image/*'
        className='hidden'
      />
    </main>
  );
}

function AfterSelectPhoto({ correctClothImg }: { correctClothImg: File }) {
  // const reader = new FileReader();
  // reader.readAsDataURL(correctClothImg);
  return (
    <main className='flex flex-col items-center'>
      <div className='overflow-hidden w-screen h-[100vw] relative'>
        <Image
          src={URL.createObjectURL(correctClothImg)}
          alt='선택한 옷 이미지'
          // width={0}
          // height={0}
          // style={{ width: '100%', height: '100%' }}
          fill
          objectFit='cover'
        />
      </div>
      <button className='py-10 px-20 text-16 rounded-4 bg-green-500 text-white absolute bottom-50'>다음</button>
    </main>
  );
}
