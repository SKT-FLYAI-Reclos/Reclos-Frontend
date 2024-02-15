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
  const inputRef = useRef<HTMLInputElement>(null);
  function selectPhoto() {
    inputRef.current?.click();
  }
  return (
    <>
      <TopNavbar left={<PrevBtn title='Back' onClick={toPrev} />} />
      {!correctClothImg ? (
        <BeforeSelectPhoto selectPhoto={selectPhoto} />
      ) : (
        <AfterSelectPhoto correctClothImg={correctClothImg} selectPhoto={selectPhoto} />
      )}
      <input
        ref={inputRef}
        onChange={(e) => {
          if (e.target.files?.length) {
            setCorrectedClothImg(e.target.files[0]);
          }
        }}
        type='file'
        accept='image/*'
        className='hidden'
      />
    </>
  );
}

function BeforeSelectPhoto({ selectPhoto }: { selectPhoto: () => void }) {
  return (
    <main className='flex flex-col items-center justify-center h-[calc(100vh-64px)] relative'>
      <div className='px-40'>Reclos에서는 피팅 모델을 생성할 수 있어요. 옷을 앞 뒤로 찍어봐요 ..... 어쩌고 저쩌고</div>
      <button
        onClick={selectPhoto}
        className='py-10 px-20 text-16 rounded-4 bg-green-500 text-white absolute bottom-50'
      >
        생성하기
      </button>
    </main>
  );
}

function AfterSelectPhoto({ correctClothImg, selectPhoto }: { correctClothImg: File; selectPhoto: () => void }) {
  return (
    <main className='flex flex-col items-center h-[calc(100vh-64px)]'>
      <div className='overflow-hidden w-screen h-[100vw] relative shrink-0'>
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
      <div className='w-full h-full flex flex-col items-center justify-center gap-10'>
        <button
          onClick={selectPhoto}
          className='w-130 py-10 text-16 rounded-4 bg-white text-green-500 border-2 border-solid border-green-500 flex justify-center items-center'
        >
          다시 선택하기
        </button>
        <button className='w-130 py-10 text-16 rounded-4 bg-green-500 text-white border-2 border-solid border-green-500 flex justify-center items-center'>
          선택 완료
        </button>
      </div>
    </main>
  );
}
