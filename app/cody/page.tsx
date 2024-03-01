'use client';

import genFittingmodel, { genFittingModelOnBoard } from '@/apis/genFittingmodelApi';
import HeartIcon from '@/components/icons/heartIcon';
import AppLayout from '@/components/layouts/appLayout';
import LoadingWithBackdrop from '@/components/loading/loadingWithBackdrop';
import PrevBtn from '@/components/navbar/prevBtn';
import TopNavbar from '@/components/navbar/topNavbar';
import SelectClosetClothes from '@/components/pages/cody/SelectClosetClothes';
import SelectLikeClothes from '@/components/pages/cody/SelectLikeClothes';
import ModelImgsBanner from '@/components/pages/cody/modelImgsBanner';
import cls from '@/libs/cls';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

//
export default function CodyWrapper() {
  return (
    <Suspense>
      <Cody />
    </Suspense>
  );
}

function Cody() {
  const searchParams = useSearchParams();
  const clothType = searchParams.get('cloth_type') as 'top' | 'bottom'; // 상의/하의
  const fittingModelUrls: string[] = searchParams.get('images')?.split(',') || [];
  const fittingModelRefIds: string[] = searchParams.get('ref_ids')?.split(',') || [];
  // 원래 이미지들(초기화 시 사용)
  const [originModelImgs, setOriginModelImgs] = useState<{ url: string; refId: string }[]>(
    fittingModelUrls.map((url, idx) => ({ url, refId: fittingModelRefIds[idx] }))
  );

  // 현재 보여지는 이미지들(피팅 모델 생성 시 변경)
  const [modelImgs, setModelImgs] = useState<{ url: string; refId: string }[]>(
    fittingModelUrls.map((url, idx) => ({ url, refId: fittingModelRefIds[idx] }))
  );
  const [currentModelImgIdx, setCurrentModelImgIdx] = useState(0); // 현재 보여지는 이미지 인덱스
  const [selectedClothImg, setSelectedClothImg] = useState<string>(''); // 유저가 선택한 옷 이미지
  const [mode, setMode] = useState<'like' | 'closet'>('like'); // 좋아요 한 옷들 / 내 옷장 옷들

  const changeFittingModelMutation = useMutation({ mutationFn: genFittingModelOnBoard });
  function handleTouchClothImg(clothImgUrl: string) {
    console.log(originModelImgs);
    setSelectedClothImg(clothImgUrl);
    // const newModelImgs = [...modelImgs];
    // newModelImgs[currentModelImgIdx] = {
    //   url: 'data:image/jpeg;base64,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',
    //   refId: '',
    // };
    // setModelImgs(newModelImgs);
    // return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    changeFittingModelMutation.mutate(
      {
        fittingModelRef: originModelImgs[currentModelImgIdx].refId,
        clothImgUrl,
        // category: clothType === 'top' ? 'lower_body' : 'upper_body',
        category: 'upper_body',
      },
      {
        onSuccess: (res) => {
          // const newModelImgs = [...modelImgs];
          // // newModelImgs[currentModelImgIdx] = data.image;
          // setModelImgs(newModelImgs);
          const newModelImgs = [...modelImgs];
          newModelImgs[currentModelImgIdx] = { url: res.data[0].image, refId: '' };
          // setModelImgs([{ url: res.data.image, refId: '' }]);

          setModelImgs(newModelImgs);
        },
        onError: alert,
      }
    );
  }

  // 하나의 피팅 모델에서 옷 초기화 (옷 선택 해제)
  function handleResetModelImg() {
    const newModelImgs = [...modelImgs];
    newModelImgs[currentModelImgIdx] = originModelImgs[currentModelImgIdx];
    setModelImgs(newModelImgs);
  }

  // 전체 피팅 모델 이미지 초기화
  function handleResetAllModelImgs() {
    setModelImgs(originModelImgs);
  }

  return (
    <AppLayout tnb={<TopNavbar left={<PrevBtn />} title='코디 실험실' />} showBNB={false}>
      {changeFittingModelMutation.isPending && <LoadingWithBackdrop title='피팅 모델 생성 중..' />}
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
        <SelectLikeClothes
          handleTouchClothImg={handleTouchClothImg}
          handleResetAllModelImgs={handleResetAllModelImgs}
          selectedClothImg={selectedClothImg}
          setSelectedClothImg={setSelectedClothImg}
          clothType={clothType}
        />
      ) : (
        <SelectClosetClothes
          handleTouchClothImg={handleTouchClothImg}
          handleResetModelImg={handleResetModelImg}
          handleResetAllModelImgs={handleResetAllModelImgs}
          selectedClothImg={selectedClothImg}
          setSelectedClothImg={setSelectedClothImg}
          clothType={clothType}
        />
      )}
    </AppLayout>
  );
}
