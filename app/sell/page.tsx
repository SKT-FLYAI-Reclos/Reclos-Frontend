'use client';

import SelectPhoto from '@/components/pages/sell/selectPhoto';
import AppLayout from '@/components/layouts/appLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TSellForm } from '@/types/sellFormType';
import Write from '@/components/pages/sell/write';
import GetInfoCorrectedImgPage from '@/components/pages/sell/GetInfoCorrectedImg';
import { generateInitialSellForm } from '@/constants/generateInitialSellForm';
import LoadingWithBackdrop from '@/components/loading/loadingWithBackdrop';
import { useMutation } from '@tanstack/react-query';
import removeBgApi from '@/apis/removeBgApi';
import genFittingmodel from '@/apis/genFittingmodelApi';

export default function SellPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [sellForm, setSellForm] = useState<TSellForm>(generateInitialSellForm());
  const rmbgMutation = useMutation({ mutationFn: removeBgApi });
  const genFittingmodelMutation = useMutation({ mutationFn: genFittingmodel });
  function handleToPrev() {
    if (page === 0) {
      router.back();
    } else {
      setPage(page - 1);
    }
  }

  // 원본 이미지로부터 보정된 옷 사진 생성
  function handleNext0To1(img: File) {
    // FIXME: 보정된 옷 사진 생성 api 호출 후 이미지 url 받아오기
    setSellForm((prev) => ({ ...prev, correctedCloth: { ...prev.correctedCloth, status: 'loading' } }));
    const tempImg = 'https://reclosbucket.s3.ap-northeast-2.amazonaws.com/src/ex3.jpg';
    rmbgMutation.mutate(img, {
      onSuccess: ({ data: res }) => {
        setSellForm((prev) => ({
          ...prev,
          correctedCloth: { ...prev.correctedCloth, image: res.image, uuid: res.id, status: 'generated' },
        }));
        setPage(1);
      },
    });
  }

  function handleNext1To2() {
    // 이미 생성된 피팅 모델이 있다면 다음 페이지로 이동
    // if (sellForm.fittingModel.status === 'generated') {
    //   setPage(2);
    //   return;
    // }
    // 임시로 피팅 모델 이미지 생성
    setPage(2);
    setSellForm((prev) => ({ ...prev, fittingModel: { ...prev.fittingModel, status: 'loading' } }));
    const tempImgs = [
      'https://reclosbucket.s3.ap-northeast-2.amazonaws.com/src/ex3.jpg',
      'https://reclosbucket.s3.ap-northeast-2.amazonaws.com/src/ex3.jpg',
      'https://reclosbucket.s3.ap-northeast-2.amazonaws.com/src/ex3.jpg',
    ];

    // TODO: 피팅 모델 생성 api 호출
    genFittingmodelMutation.mutate(sellForm.correctedCloth.uuid as string, {
      onSuccess: ({ data: res }) => {
        const images = res.map((item) => item.image);
        setSellForm((prev) => ({
          ...prev,
          fittingModel: { ...prev.fittingModel, images, status: 'generated' },
        }));
      },
      onError: () => {
        setSellForm((prev) => ({
          ...prev,
          fittingModel: { ...prev.fittingModel, status: 'error' },
        }));
      },
    });
  }

  return (
    <AppLayout showBNB={false}>
      {page === 0 && (
        <SelectPhoto
          toPrev={handleToPrev}
          toNext={handleNext0To1}
          selectedClothImg={sellForm.originalClothImgs?.[0] || null}
          setSelectedClothImg={(img) => setSellForm((prev) => ({ ...prev, originalClothImgs: [img] }))} // 원본 옷 사진
          sellForm={sellForm}
          setSellForm={setSellForm}
        />
      )}
      {page === 1 && (
        <GetInfoCorrectedImgPage
          toPrev={handleToPrev}
          toNext={handleNext1To2}
          clothImg={sellForm.correctedCloth.image || ''}
          status={sellForm.correctedCloth.status}
          sellForm={sellForm}
          setSellForm={setSellForm}
        />
      )}
      {page === 2 && <Write sellForm={sellForm} setSellForm={setSellForm} toPrev={handleToPrev} />}
      {sellForm.correctedCloth.status === 'loading' && <LoadingWithBackdrop title='AI가 배경을 지우는 중..' />}
    </AppLayout>
  );
}
