import { SetStateAction, Suspense } from 'react';
import TopNavbar from '../navbar/topNavbar';
import PrevBtn from '../navbar/prevBtn';
import Image from 'next/image';
import SelectionBox, { TSelectionBoxOption } from '../select/selectionBox';
import { TSellForm, TSex } from '@/types/sellFormType';

export default function CreateCorrectedImgPage({
  toPrev,
  toNext,
  selectedClothImg: correctedClothImg,
  setSelectedClothImg: setCorrectedClothImg,
  sellForm,
  setSellForm,
}: {
  toPrev: () => void;
  toNext: () => void;
  selectedClothImg: File;
  setSelectedClothImg: (img: File) => void;
  sellForm: TSellForm;
  setSellForm: React.Dispatch<SetStateAction<TSellForm>>;
}) {
  return (
    <Suspense fallback={Loading}>
      <CreateCorrectedImg
        toPrev={toPrev}
        toNext={toNext}
        correctedClothImg={correctedClothImg}
        setCorrectedClothImg={setCorrectedClothImg}
        sellForm={sellForm}
        setSellForm={setSellForm}
      />
    </Suspense>
  );
}

function CreateCorrectedImg({
  toPrev,
  toNext,
  correctedClothImg,
  setCorrectedClothImg,
  sellForm,
  setSellForm,
}: {
  toPrev: () => void;
  toNext: () => void;
  correctedClothImg: File;
  setCorrectedClothImg: (img: File) => void;
  sellForm: TSellForm;
  setSellForm: React.Dispatch<SetStateAction<TSellForm>>;
}) {
  const selectionBoxOptions: TSelectionBoxOption<TSex>[] = [
    { label: '남/여 공용', value: 'both' },
    { label: '남자', value: 'male' },
    { label: '여자', value: 'female' },
  ];
  return (
    <>
      <TopNavbar left={<PrevBtn title='Back' onClick={toPrev} />} title='옷 정보 입력' />
      <main className='h-[calc(100vh-64px)] flex flex-col'>
        <div className='overflow-hidden w-screen h-[100vw] relative shrink-0 mb-50'>
          <Image src={URL.createObjectURL(correctedClothImg)} alt='선택한 옷 이미지' fill objectFit='cover' />
        </div>
        {/* <section className='flex flex-col items-center mx-auto h-full'>
          
        </section> */}
        <section className='fixed bottom-10 left-20 w-[calc(100vw-40px)] flex flex-col gap-50'>
          <div>
            <div className='mb-10 text-16 text-indigo-600 font-semibold'>성별</div>
            <SelectionBox
              value={sellForm.sex}
              options={selectionBoxOptions}
              onChange={(sex) => setSellForm((prev) => ({ ...prev, sex }))}
            />
          </div>
          <div className='w-full h-full flex justify-center items-center'>
            <button className=' bg-indigo-600 rounded-8 text-16 text-white w-full py-10 flex justify-center items-center'>
              피팅 모델 생성하기
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

const Loading = (
  <div className='w-screen h-screen flex justify-center items-center text-indigo-600'>옷 판매 사진 생성 중...</div>
);
