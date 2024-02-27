'use client';

import Image from 'next/image';
import { useState } from 'react';
import XIcon from '../../../public/icons/close.svg';

export default function Tips({ selectPhoto }: { selectPhoto: () => void }) {
  const [page, setPage] = useState(0);

  function handleClickNext() {
    if (page === 2) {
      selectPhoto();
    } else {
      setPage(page + 1);
    }
  }
  return (
    <main className='flex flex-col items-center h-[calc(100vh-64px)] relative pt-94 px-20'>
      {page === 0 && <Tip0 />}
      {page === 1 && <Tip1 />}
      {page === 2 && <Tip2 />}

      <div className='fixed left-20 bottom-10 w-[calc(100vw-40px)] flex flex-col gap-10'>
        {page !== 0 && (
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className='w-full text-16 border-2 border-solid border-indigo-600 bg-white flex justify-center items-center py-12 px-20 box-border text-indigo-600 rounded-8'
          >
            이전
          </button>
        )}
        <button
          onClick={handleClickNext}
          className='w-full text-16 border-2 border-solid border-indigo-600 bg-indigo-600 flex justify-center items-center py-12 px-20 box-border text-white rounded-8'
        >
          {page === 2 ? '생성하기' : '다음'}
        </button>
      </div>
    </main>
  );
}

function Tip0() {
  return (
    <>
      <section className='w-full py-20 px-20 bg-gray-light flex flex-col gap-20 rounded-8 mb-20 text-18 font-medium'>
        <span>Reclos에서는 옷 사진 하나로 다양한 피팅 모델을 생성할 수 있어요.</span>
        <span>옷을 가지런히 정돈한 후 사진을 찍으면 에이클로젯 AI가 자동으로 배경을 깔끔하게 지워줄 거에요.</span>
      </section>

      <section className='w-full py-20 px-20 bg-indigo-50 flex flex-col gap-20 rounded-8 font-medium'>
        <span className='text-20'>💡 촬영 Tip</span>
        <span className='text-18'>
          1. 옷을 평평한 바닥에 놓고 찍으세요. 이 때 단색의 바닥에 놓고 찍으면 더 깔끔한 피팅 모델이 생성돼요.
        </span>
        <span className='text-18'>2. 옷의 팔 부분이 앞이나 뒤로 젖히지 않게 해주세요.</span>
        <span className='text-18'>3. 옷의 각도가 삐뚫어지지 않게 주의해주세요.</span>
      </section>
    </>
  );
}

function Tip1() {
  return (
    <>
      <section className='p-20 w-full mb-20 rounded-8 bg-green-200 flex flex-col gap-10'>
        <span className='text-18 font-medium text-green-700'>좋은 예시</span>
        <div className='flex items-center gap-10'>
          {['평평한 바닥', '팔 부분', '각도'].map((text) => (
            <div key={text} className='flex items-center gap-3'>
              <span className='block mt-3 text-gray-600 text-16'>{text}</span>
              <div className='w-16 h-16 rounded-full border-2 border-solid border-green-600'></div>
            </div>
          ))}
        </div>
      </section>
      <section className='relative w-full h-370'>
        <Image src={'/imgs/ex_correct_cloth1.png'} alt='좋은 예시 옷 사진' fill objectFit='contain' />
      </section>
    </>
  );
}

function Tip2() {
  return (
    <>
      <section className='p-20 w-full mb-20 rounded-8 bg-red-100 flex flex-col gap-10'>
        <span className='text-18 font-medium text-red-600'>안좋은 예시</span>
        <div className='flex items-center gap-10'>
          {['평평한 바닥', '팔 부분', '각도'].map((text) => (
            <div key={text} className='flex items-center gap-5'>
              <span className='block mt-3 text-gray-600 text-16'>{text}</span>
              <XIcon width='10' heigit='10' color='#DC2626' stroke-width='5' />
            </div>
          ))}
        </div>
      </section>
      <section className='relative w-full h-370 rounded-8 border-1 border-solid border-red-500'>
        <Image src={'/imgs/ex_uncorrect_cloth1.png'} alt='좋은 예시 옷 사진' fill objectFit='contain' />
      </section>
    </>
  );
}
