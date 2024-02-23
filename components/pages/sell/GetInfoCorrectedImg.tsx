import { SetStateAction, Suspense } from 'react';
import TopNavbar from '../../navbar/topNavbar';
import PrevBtn from '../../navbar/prevBtn';
import Image from 'next/image';
import SelectionBox, { TSelectionBoxOption } from '../../select/selectionBox';
import { TGenerateStatus, TSellForm, TSex, TSize } from '@/types/sellFormType';

export default function GetInfoCorrectedImg({
  toPrev,
  toNext,
  clothImg,
  sellForm,
  status,
  setSellForm,
}: {
  toPrev: () => void;
  toNext: () => void;
  clothImg: string;
  sellForm: TSellForm;
  status: TGenerateStatus;
  setSellForm: React.Dispatch<SetStateAction<TSellForm>>;
}) {
  const sexOptions: TSelectionBoxOption<TSex>[] = [
    { label: '남자', value: 'male' },
    { label: '여자', value: 'female' },
    { label: '남/여 공용', value: 'both' },
  ];
  const sizeOptions: TSelectionBoxOption<TSize>[] = [
    { label: 'S', value: 's' },
    { label: 'M', value: 'm' },
    { label: 'L', value: 'l' },
    { label: 'XL', value: 'xl' },
    { label: 'XXL', value: 'xxl' },
    { label: 'XXXL', value: 'xxxl' },
  ];
  return (
    <>
      <TopNavbar left={<PrevBtn title='Back' onClick={toPrev} />} title='옷 정보 입력' />
      <main className='h-[calc(100vh-64px)] flex flex-col'>
        <div className='overflow-hidden w-screen h-[100vw] relative shrink-0 mb-30'>
          <Image src={clothImg} alt='보정된 옷 이미지' fill objectFit='cover' />
        </div>
        <section className='px-20'>
          <div className='mb-10 text-16 text-indigo-600 font-semibold'>성별</div>
          <SelectionBox
            value={sellForm.sex}
            options={sexOptions}
            onValueChange={(sex) => setSellForm((prev) => ({ ...prev, sex }))}
            className='mb-20'
          />
          <div className='text-16 text-indigo-600 font-semibold'>사이즈</div>
          <SelectionBox
            value={sellForm.size}
            options={sizeOptions}
            onValueChange={(size) => setSellForm((prev) => ({ ...prev, size }))}
            className='mb-20'
          />
        </section>
        <button
          onClick={toNext}
          className='fixed bottom-10 left-20 w-[calc(100vw-40px)] bg-indigo-600 rounded-8 text-16 text-white py-10 flex justify-center items-center'
        >
          완료
        </button>
      </main>
    </>
  );
}
