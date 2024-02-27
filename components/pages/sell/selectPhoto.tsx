'use client';

import { useRef } from 'react';
import PrevBtn from '../../navbar/prevBtn';
import TopNavbar from '../../navbar/topNavbar';
import Image from 'next/image';
import useAlert from '@/recoil/alert/useAlert';
import { TSellForm } from '@/types/sellFormType';
import { generateInitialSellForm } from '@/constants/generateInitialSellForm';
import Tips from './tips';

export default function SelectPhoto({
  toPrev,
  toNext,
  selectedClothImg,
  setSelectedClothImg,
  sellForm,
  setSellForm,
}: {
  toPrev: () => void;
  toNext: (img: File) => void;
  selectedClothImg: File | null;
  setSelectedClothImg: (img: File) => void;
  sellForm: TSellForm;
  setSellForm: (form: TSellForm) => void;
}) {
  const { showAlert } = useAlert();
  const inputRef = useRef<HTMLInputElement>(null);
  function selectPhoto() {
    const isExist = sellForm.originalClothImgs;
    if (!isExist) {
      inputRef.current?.click();
      return;
    }

    // 이미 선택된 사진이 있다면 경고

    showAlert({
      alertViewTitle: '사진을 변경하면 작성된 모든 항목이 초기화됩니다. 계속하시겠습니까?',
      alertActions: [
        { title: '취소', style: 'primary', handler: null },
        {
          title: '확인',
          style: 'danger',
          handler: () => inputRef.current?.click(),
        },
      ],
    });
  }

  function handleOnChangePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedPhoto = e.target.files?.[0];
    if (!selectedPhoto) return;

    if (!sellForm.originalClothImgs) {
      setSelectedClothImg(selectedPhoto);
      return;
    }

    // 이미 선택된 사진이 있다면 경고 후 작성된 항목 초기화
    const initialSellForm = generateInitialSellForm();
    initialSellForm.originalClothImgs = [selectedPhoto];
    setSellForm(initialSellForm);
  }

  function handleToPrev() {
    if (selectedClothImg) {
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
      <TopNavbar left={<PrevBtn onClick={handleToPrev} />} autoOpaque title='옷 선택하기' />
      {!selectedClothImg ? (
        <Tips selectPhoto={selectPhoto} />
      ) : (
        <AfterSelectPhoto selectedClothImg={selectedClothImg} selectPhoto={selectPhoto} toNext={toNext} />
      )}
      <input ref={inputRef} onChange={handleOnChangePhoto} type='file' accept='image/*' className='hidden' />
    </>
  );
}

// function BeforeSelectPhoto({ selectPhoto }: { selectPhoto: () => void }) {
//   return (
//     <Tips selectPhoto={selectPhoto} />
//   );
// }

function AfterSelectPhoto({
  selectedClothImg,
  selectPhoto,
  toNext,
}: {
  selectedClothImg: File;
  selectPhoto: () => void;
  toNext: (img: File) => void;
}) {
  return (
    <main className='flex flex-col items-center h-[calc(100vh-64px)] pt-64'>
      <div className='overflow-hidden w-screen h-[100vw] relative shrink-0'>
        <Image src={URL.createObjectURL(selectedClothImg)} alt='선택한 옷 이미지' fill objectFit='contain' />
      </div>
      <div className='fixed bottom-10 left-20 w-[calc(100vw-40px)] flex flex-col gap-10'>
        <button
          onClick={selectPhoto}
          className='w-full py-10 text-16 rounded-8 bg-white text-indigo-600 border-2 border-solid border-indigo-600 flex justify-center items-center'
        >
          다시 선택하기
        </button>
        <button
          onClick={() => toNext(selectedClothImg)}
          className='w-full py-10 text-16 rounded-8 bg-indigo-600 text-white border-2 border-solid border-indigo-600 flex justify-center items-center'
        >
          선택 완료
        </button>
      </div>
    </main>
  );
}
