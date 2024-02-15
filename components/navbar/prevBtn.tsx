import { HTMLAttributes } from 'react';
import PrevIcon from '../../public/icons/back.svg';

export default function PrevBtn({ title, ...props }: { title?: string } & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className='flex justify-center items-center gap-5'>
      <PrevIcon />
      <span className='text-16 font-normal text-blue-500'>{title}</span>
    </button>
  );
}
