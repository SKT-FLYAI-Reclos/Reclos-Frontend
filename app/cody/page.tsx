'use client';

import AppLayout from '@/components/layouts/appLayout';
import PrevBtn from '@/components/navbar/prevBtn';
import TopNavbar from '@/components/navbar/topNavbar';
import ModelImgsBanner from '@/components/pages/cody/modelImgsBanner';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Cody() {
  const searchParams = useSearchParams();
  const [modelImgs, setModelImgs] = useState<string[]>(searchParams.get('images')?.split(',') || []);
  const [currentModelImgIdx, setCurrentModelImgIdx] = useState(0);
  const [selectedClothImg, setSelectedClothImg] = useState<string>('');

  return (
    <AppLayout tnb={<TopNavbar left={<PrevBtn />} title='코디 실험실' />} showBNB={false}>
      <ModelImgsBanner
        modelImgs={modelImgs}
        currentImgIdx={currentModelImgIdx}
        setCurrentImgIdx={setCurrentModelImgIdx}
      />
    </AppLayout>
  );
}
