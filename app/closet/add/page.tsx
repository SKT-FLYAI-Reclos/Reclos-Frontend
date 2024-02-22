'use client';

import { useEffect, useRef, useState } from 'react';
import AppLayout from '@/components/layouts/appLayout';
import PrevBtn from '@/components/navbar/prevBtn';
import TopNavbar from '@/components/navbar/topNavbar';
import ImagesSelectTool from '@/components/utils/selectImagesTool';
import PhotoAddIcon from '../../../public/icons/photo--add.svg';
import useSelectImagesTool from '@/hooks/useSelectImagesTool';
import cls from '@/libs/cls';
import postAddClothes from '@/apis/addClothesApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const MAX_IMG_COUNT = 20;

export default function AddClothPage() {
  const router = useRouter();
  const {
    config: topClothToolConfig,
    selectedImgs: selectedTopClothImgs,
    mode: topClothToolMode,
    changeMode: topClothToolChangeMode,
  } = useSelectImagesTool(MAX_IMG_COUNT);
  const {
    config: bottomClothToolConfig,
    selectedImgs: selectedBottomClothImgs,
    mode: bottomClothToolMode,
    changeMode: bottomClothToolChangeMode,
  } = useSelectImagesTool(MAX_IMG_COUNT);

  const addClothMutation = useMutation({ mutationFn: postAddClothes });

  function handleToPrev() {
    router.back();
  } // TODO: 상단바 뒤로가기

  async function handleSubmit() {
    const isEmpty = selectedTopClothImgs.length === 0 && selectedBottomClothImgs.length === 0;
    if (isEmpty) {
      alert('상의나 하의 중 하나는 선택해야 합니다.');
      return;
    }
    addClothMutation.mutate(
      { topClothes: selectedTopClothImgs, bottomClothes: selectedBottomClothImgs },
      {
        onSuccess: () => {
          alert('옷 추가에 성공했습니다.');
          router.replace('/closet');
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  }
  return (
    <AppLayout tnb={<TopNavbar left={<PrevBtn onClick={handleToPrev} />} title='옷 추가하기' />} showBNB={false}>
      <main className='pt-30 px-20 min-h-[calc(100vh-64px)]'>
        {/* ------------------상의 추가하기------------------ */}

        <div className='flex items-center mb-10'>
          <h4 className='text-16 text-black font-medium mr-5'>상의 추가하기</h4>
          <div className='px-5 py-2 mr-10 font-normal text-12 text-indigo-600 bg-indigo-50 rounded-4'>
            {selectedTopClothImgs.length}/{MAX_IMG_COUNT}
          </div>
          {selectedTopClothImgs.length > 0 && (
            <>
              <button
                onClick={() => topClothToolChangeMode('add')}
                disabled={topClothToolMode === 'delete' || selectedTopClothImgs.length === MAX_IMG_COUNT}
                className={
                  'mr-5 text-12 text-indigo-600 font-medium px-5 py-2 border-1 border-solid border-indigo-600 rounded-4 disabled:opacity-30'
                }
              >
                추가하기
              </button>
              <button
                onClick={() => topClothToolChangeMode(topClothToolMode === 'delete' ? 'normal' : 'delete')}
                className={cls(
                  'mr-5 text-12 font-medium px-5 py-2 border-1 border-solid border-indigo-600 rounded-4',
                  topClothToolMode === 'delete' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
                )}
              >
                {topClothToolMode === 'delete' ? '완료' : '편집'}
              </button>
            </>
          )}
        </div>
        <ImagesSelectTool
          {...topClothToolConfig}
          maxLength={MAX_IMG_COUNT}
          maxCol={4}
          className=' bg-indigo-50 w-full h-200 rounded-8 mb-30'
          placeHolder={
            <div className='flex items-center gap-10'>
              <PhotoAddIcon />
              <span className='text-14 text-gray-500'>여기를 눌러서 상의를 선택해주세요.</span>
            </div>
          }
        />

        {/* ------------------하의 추가하기------------------ */}
        <div className='flex items-center mb-10'>
          <h4 className='text-16 text-black font-medium mr-5'>하의 추가하기</h4>
          <div className='px-5 py-2 mr-10 font-normal text-12 text-purple-600 bg-purple-50 rounded-4'>
            {selectedBottomClothImgs.length}/{MAX_IMG_COUNT}
          </div>
          {selectedBottomClothImgs.length > 0 && (
            <>
              <button
                onClick={() => bottomClothToolChangeMode('add')}
                disabled={bottomClothToolMode === 'delete' || selectedBottomClothImgs.length === MAX_IMG_COUNT}
                className={
                  'mr-5 text-12 text-purple-600 font-medium px-5 py-2 border-1 border-solid border-purple-600 rounded-4 disabled:opacity-30'
                }
              >
                추가하기
              </button>
              <button
                onClick={() => bottomClothToolChangeMode(bottomClothToolMode === 'delete' ? 'normal' : 'delete')}
                className={cls(
                  'mr-5 text-12 font-medium px-5 py-2 border-1 border-solid border-purple-600 rounded-4',
                  bottomClothToolMode === 'delete' ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
                )}
              >
                {bottomClothToolMode === 'delete' ? '완료' : '편집'}
              </button>
            </>
          )}
        </div>
        <ImagesSelectTool
          {...bottomClothToolConfig}
          maxLength={MAX_IMG_COUNT}
          maxCol={4}
          className=' bg-purple-50 w-full h-200 rounded-8'
          placeHolder={
            <div className='flex items-center gap-10'>
              <PhotoAddIcon />
              <span className='text-14 text-gray-500'>여기를 눌러서 하의를 선택해주세요.</span>
            </div>
          }
        />

        <button
          onClick={handleSubmit}
          className={cls(
            'fixed left-20 bottom-10 w-[calc(100vw-40px)] bg-indigo-600 flex justify-center items-center py-10 px-20 box-border text-white rounded-8',
            addClothMutation.isPending ? 'opacity-30' : ''
          )}
        >
          {addClothMutation.isPending ? '업로드 중...' : '추가하기'}
        </button>
      </main>
    </AppLayout>
  );
}
