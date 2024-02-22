'use client';

import { useRef } from 'react';
import PrevBtn from '../navbar/prevBtn';
import TopNavbar from '../navbar/topNavbar';
import Image from 'next/image';
import useAlert from '@/recoil/alert/useAlert';

export default function SelectPhoto({
  toPrev,
  toNext,
  selectedClothImg: correctedClothImg,
  setSelectedClothImg: setCorrectedClothImg,
}: {
  toPrev: () => void;
  toNext: () => void;
  selectedClothImg: File | null;
  setSelectedClothImg: (img: File) => void;
}) {
  const { showAlert } = useAlert();
  const inputRef = useRef<HTMLInputElement>(null);
  function selectPhoto() {
    inputRef.current?.click();
  }

  function handleToPrev() {
    if (correctedClothImg) {
      // promp('페이지에서 나가면 선택한 사진이 사라집니다. 계속하시겠습니까?');
      showAlert({
        alertViewTitle: '페이지에서 나가면 선택한 사진이 사라집니다. 계속하시겠습니까?',
        alertActions: [
          { title: '취소', style: 'primary', handler: null },
          { title: '확인', style: 'danger', handler: toPrev },
        ],
      });
    } else {
      toPrev();
    }
  }
  return (
    <>
      <TopNavbar left={<PrevBtn title='Back' onClick={handleToPrev} />} title='옷 선택하기' />
      {!correctedClothImg ? (
        <BeforeSelectPhoto selectPhoto={selectPhoto} />
      ) : (
        <AfterSelectPhoto correctedClothImg={correctedClothImg} selectPhoto={selectPhoto} toNext={toNext} />
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
      {/* <button
        onClick={selectPhoto}
        className='py-10 px-20 text-16 rounded-4 bg-indigo-600 text-white absolute bottom-50'
      >
        
      </button> */}
      <button
        onClick={selectPhoto}
        className='fixed left-20 bottom-10 w-[calc(100vw-40px)] bg-indigo-600 flex justify-center items-center py-10 px-20 box-border text-white rounded-8'
      >
        생성하기
      </button>
    </main>
  );
}

function AfterSelectPhoto({
  correctedClothImg,
  selectPhoto,
  toNext,
}: {
  correctedClothImg: File;
  selectPhoto: () => void;
  toNext: () => void;
}) {
  return (
    <main className='flex flex-col items-center h-[calc(100vh-64px)]'>
      <div className='overflow-hidden w-screen h-[100vw] relative shrink-0'>
        <Image src={URL.createObjectURL(correctedClothImg)} alt='선택한 옷 이미지' fill objectFit='cover' />
      </div>
      <div className='fixed bottom-10 left-20 w-[calc(100vw-40px)] flex flex-col gap-10'>
        <button
          onClick={selectPhoto}
          className='w-full py-10 text-16 rounded-8 bg-white text-indigo-600 border-2 border-solid border-indigo-600 flex justify-center items-center'
        >
          다시 선택하기
        </button>
        <button
          onClick={toNext}
          className='w-full py-10 text-16 rounded-8 bg-indigo-600 text-white border-2 border-solid border-indigo-600 flex justify-center items-center'
        >
          선택 완료
        </button>
      </div>
    </main>
  );
}
