'use client';
import PlusIcon from '../../../public/icons/plus.svg';
import { useRouter } from 'next/navigation';

export default function SellBtn() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push('/sell')}
        className='fixed right-20 bottom-90 bg-indigo-600 py-10 px-12 flex justify-center items-center gap-5 rounded-full'
      >
        <PlusIcon />
        <span className='text-16 font-normal text-white'>판매하기</span>
      </button>
    </>
  );
}
