'use client';

import HeartIcon from '@/components/icons/heartIcon';
import AppLayout from '@/components/layouts/appLayout';
import PrevBtn from '@/components/navbar/prevBtn';
import TopNavbar from '@/components/navbar/topNavbar';
import SelectClosetClothes from '@/components/pages/cody/SelectClosetClothes';
import SelectLikeClothes from '@/components/pages/cody/SelectLikeClothes';
import ModelImgsBanner from '@/components/pages/cody/modelImgsBanner';
import cls from '@/libs/cls';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

export default function Cody() {
  const searchParams = useSearchParams();
  const clothType = searchParams.get('cloth_type'); // 상의/하의
  const [originModelImgs, setOriginModelImgs] = useState<string[]>(searchParams.get('images')?.split(',') || []); // 원래 이미지들(초기화 시 사용)
  const [modelImgs, setModelImgs] = useState<string[]>(searchParams.get('images')?.split(',') || []); // 현재 보여지는 이미지들(피팅 모델 생성 시 변경)
  const [currentModelImgIdx, setCurrentModelImgIdx] = useState(0); // 현재 보여지는 이미지 인덱스
  const [selectedClothImg, setSelectedClothImg] = useState<string>(''); // 유저가 선택한 옷 이미지
  const [mode, setMode] = useState<'like' | 'closet'>('like'); // 좋아요 한 옷들 / 내 옷장 옷들

  return (
    <AppLayout tnb={<TopNavbar left={<PrevBtn />} title='코디 실험실' />} showBNB={false}>
      <ModelImgsBanner
        modelImgs={modelImgs}
        currentImgIdx={currentModelImgIdx}
        setCurrentImgIdx={setCurrentModelImgIdx}
      />
      <div className='flex justify-center items-center gap-10 relative mb-20'>
        <button
          onClick={() => setMode('like')}
          className={cls(
            'px-22 py-8 rounded-6 border-1 border-solid border-indigo-600',
            mode === 'like' ? 'bg-indigo-600' : 'bg-white'
          )}
        >
          <HeartIcon width='16' height='14' color={mode === 'like' ? 'white' : '#4F46E5'} />
        </button>
        <button
          onClick={() => setMode('closet')}
          className={cls(
            'px-12 py-6 text-12 font-semibold rounded-6 border-1 border-solid border-indigo-600',
            mode === 'closet' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'
          )}
        >
          내 옷장
        </button>
        <button
          onClick={() => setModelImgs(originModelImgs)}
          className='absolute right-22 text-12 font-medium text-indigo-600'
        >
          초기화
        </button>
      </div>
      {mode === 'like' ? (
        <SelectLikeClothes />
      ) : (
        <SelectClosetClothes selectedClothImg={selectedClothImg} setSelectedClothImg={setSelectedClothImg} />
      )}
    </AppLayout>
  );
}
