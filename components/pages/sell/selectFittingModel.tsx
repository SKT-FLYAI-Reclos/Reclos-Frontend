'use client';

import LoadingSpinner from '@/components/loading/loadingSpinner';
import { TFittingModel, TSellForm } from '@/types/sellFormType';
import PhotoAddIcon from '../../../public/icons/photo--add.svg';
import { SetStateAction, useState } from 'react';
import TopNavbar from '@/components/navbar/topNavbar';
import PrevBtn from '@/components/navbar/prevBtn';
import Image from 'next/image';
import cls from '@/libs/cls';
import CheckIcon from '../../../public/icons/check.svg';

export default function SelectFittingModelWrapper({
  sellForm,
  setSellForm,
}: {
  sellForm: TSellForm;
  setSellForm: React.Dispatch<SetStateAction<TSellForm>>;
}) {
  const [showSelectFittingModel, setShowSelectFittingModel] = useState(false);
  const selectedImages = sellForm.fittingModel.images.filter((_, i) => sellForm.fittingModel.selectedIdx.includes(i));

  return (
    <section>
      {sellForm.fittingModel.status === 'selected' && (
        <div className='flex items-center gap-10 mb-10'>
          <span className='text-black text-16 font-medium'>생성된 피팅 모델 사진</span>
          <button
            onClick={() => setShowSelectFittingModel(true)}
            className='text-12 text-indigo-600 font-medium px-5 py-2 border-1 border-solid border-indigo-600 rounded-4'
          >
            다시 선택하기
          </button>
        </div>
      )}
      <div
        onClick={sellForm.fittingModel.status === 'generated' ? () => setShowSelectFittingModel(true) : undefined}
        className='w-full h-80 rounded-8 bg-indigo-50 mb-20'
      >
        {sellForm.fittingModel.status === 'loading' && (
          <div className='flex items-center justify-center gap-7 w-full h-full'>
            <LoadingSpinner width={20} height={20} />
            <span className='text-12 font-normal text-gray-500'>
              피팅 모델이 생성되고 있어요. 잠시만 기다려주세요...
            </span>
          </div>
        )}
        {sellForm.fittingModel.status === 'generated' && (
          <div className='flex items-center justify-center gap-10 w-full h-full'>
            <PhotoAddIcon />
            <span className='text-12 text-gray-500'>피팅 모델이 완성되었어요! 사진을 선택해주세요.</span>
          </div>
        )}
        {sellForm.fittingModel.status === 'selected' && (
          <div className='p-10 flex items-center gap-10 overflow-x-scroll'>
            {selectedImages.map((img, i) => (
              <div
                key={i}
                className='w-60 h-60 relative flex justify-center items-center border-1 border-solid border-indigo-200 rounded-8 bg-white select-none'
              >
                <Image
                  src={img}
                  alt='선택된 피팅 모델 사진'
                  width={0}
                  height={0}
                  objectFit='contain'
                  className='w-full h-full rounded-8'
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {showSelectFittingModel && (
        <SelectFittingModel
          selectedImages={selectedImages}
          sellForm={sellForm}
          setSellForm={setSellForm}
          onClose={() => setShowSelectFittingModel(false)}
        />
      )}
    </section>
  );
}

function SelectFittingModel({
  selectedImages,
  sellForm,
  setSellForm,
  onClose,
}: {
  selectedImages: string[];
  sellForm: TSellForm;
  setSellForm: React.Dispatch<SetStateAction<TSellForm>>;
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);
  const isSelected = sellForm.fittingModel.selectedIdx.includes(page); // 해당 페이지의 이미지가 선택되었는지
  const isLastPage = page === sellForm.fittingModel.images.length; // 마지막 페이지인지
  const currentImg = sellForm.fittingModel.images[page];
  function handleToTNBPrev() {
    // TODO:
  }

  function handleToNext() {
    if (isLastPage) {
      onClose();
      setSellForm((prev) => ({ ...prev, fittingModel: { ...prev.fittingModel, status: 'selected' } }));
      return;
    }
    setPage((prev) => prev + 1);
  }

  return (
    <div className='fixed left-0 top-0 z-backdrop w-screen min-h-screen bg-white'>
      <TopNavbar title='피팅 모델 선택하기' />
      {!isLastPage && (
        <div className='w-full h-full pt-64'>
          <Image
            src={currentImg}
            alt='생성된 피팅 모델 사진'
            width={0}
            height={0}
            // fill
            objectFit='contain'
            className='w-full h-400'
          />

          <div className='flex justify-center items-center gap-5 pt-10 relative'>
            {Array.from({ length: sellForm.fittingModel.images.length }).map((_, i) => (
              <div
                key={i}
                className={cls('w-10 h-10 rounded-full', i === page ? 'bg-indigo-600' : 'bg-gray-300')}
              ></div>
            ))}
            <button
              onClick={() =>
                setSellForm((prev) => ({
                  ...prev,
                  fittingModel: {
                    ...prev.fittingModel,
                    selectedIdx: isSelected
                      ? [...prev.fittingModel.selectedIdx.filter((idx) => idx !== page)]
                      : [...prev.fittingModel.selectedIdx, page],
                  },
                }))
              }
              className={cls(
                'absolute right-10 top-10 w-24 h-24 rounded-full border-2 border-solid flex justify-center items-center',
                isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-indigo-300'
              )}
            >
              <CheckIcon width='14' height='10' color={isSelected ? '#fff' : '#C7D2FE'} />
            </button>
          </div>
        </div>
      )}
      {isLastPage && <FinishSelectFittingModel selectedImages={selectedImages} onClose={onClose} />}
      <div className='absolute bottom-10 left-0 w-full px-10'>
        {page !== 0 && (
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className='w-full bg-white border-2 border-solid border-indigo-600 rounded-8 text-16 py-10 flex justify-center items-center text-indigo-600 mb-10'
          >
            이전
          </button>
        )}
        <button
          onClick={handleToNext}
          className='w-full bg-indigo-600 border-2 border-solid border-indigo-600 rounded-8 text-16 py-10 flex justify-center items-center text-white'
        >
          {isLastPage ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
}

// 완료 페이지 (총 4개의 사진을 선택했어요!)
function FinishSelectFittingModel({ selectedImages, onClose }: { selectedImages: string[]; onClose: () => void }) {
  return (
    <div className='w-full h-full pt-84'>
      <h2 className='block mb-20 text-16 text-indigo-600 text-center font-semibold'>
        총 {selectedImages.length}개의 사진을 선택했어요
      </h2>
      <div
        style={{
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: 'repeat(2, 1fr)',
          rowGap: '20px',
        }}
      >
        {selectedImages.map((img, i) => (
          <div key={i}>
            <Image
              src={img}
              alt='선택된 피팅 모델 사진'
              width={0}
              height={0}
              objectFit='contain'
              className='w-150 h-150'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
