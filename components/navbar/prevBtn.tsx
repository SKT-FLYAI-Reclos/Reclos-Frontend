'use client';

import { HTMLAttributes } from 'react';
import PrevIcon from '../icons/prevIcon';
import { useRouter } from 'next/navigation';

export default function PrevBtn({ title, ...props }: { title?: string } & HTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  return (
    <button {...props} onClick={props.onClick ?? router.back} className='flex justify-center items-center gap-5'>
      <PrevIcon />
      <span className='text-16 font-normal text-blue-500'>{title}</span>
    </button>
  );
}
