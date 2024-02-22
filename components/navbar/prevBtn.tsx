'use client';

import { HTMLAttributes } from 'react';
import PrevIcon from '../icons/prevIcon';
import { useRouter } from 'next/navigation';

export default function PrevBtn({ title, ...props }: { title?: string } & HTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  return (
    <button {...props} onClick={props.onClick ?? router.back} className='flex justify-center items-center gap-5'>
      <PrevIcon width='18' height='24' color='#4F46E5' />
      <span className='text-16 font-normal text-indigo-600'>{title}</span>
    </button>
  );
}
