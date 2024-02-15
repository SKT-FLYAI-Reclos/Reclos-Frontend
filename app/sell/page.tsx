'use client';

import SelectPhoto from '@/components/sell/selectPhotoPage';
import AppLayout from '@/components/layouts/appLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CreateCorrectedImgPage from '@/components/sell/CreateCorrectedImgPage';
import { TSellForm } from '@/types/sellFormType';

const initialSellForm: TSellForm = {
  sex: 'both',
  size: 'l',
  title: null,
  description: null,
  price: null,
  correctedClothImg: null,
};

export default function SellPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [selectedClothImg, setSelectedClothImg] = useState<File | null>(null);
  const [sellForm, setSellForm] = useState<TSellForm>(initialSellForm);
  function handleToPrev() {
    if (page === 0) {
      router.back();
    } else {
      setPage(page - 1);
    }
  }
  function handleToNext() {
    setPage(page + 1);
  }
  return (
    <AppLayout showBNB={false}>
      {page === 0 && (
        <SelectPhoto
          toPrev={handleToPrev}
          toNext={handleToNext}
          selectedClothImg={selectedClothImg}
          setSelectedClothImg={setSelectedClothImg}
        />
      )}
      {page === 1 && (
        <CreateCorrectedImgPage
          toPrev={handleToPrev}
          toNext={handleToNext}
          selectedClothImg={selectedClothImg!}
          setSelectedClothImg={setSelectedClothImg}
          sellForm={sellForm}
          setSellForm={setSellForm}
        />
      )}
    </AppLayout>
  );
}
