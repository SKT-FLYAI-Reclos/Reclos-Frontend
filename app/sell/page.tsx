'use client';

import SelectPhoto from '@/components/cell/selectPhoto';
import AppLayout from '@/components/layouts/appLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CellPage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [correctedClothImg, setCorrectedClothImg] = useState<File | null>(null);
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
          correctClothImg={correctedClothImg}
          setCorrectedClothImg={setCorrectedClothImg}
        />
      )}
    </AppLayout>
  );
}
