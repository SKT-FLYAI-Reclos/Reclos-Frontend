import cls from '@/libs/cls';
import { HTMLAttributes } from 'react';

export default function CreditGauge({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cls('rounded-4 bg-gray-light overflow-hidden', props.className ?? '')}>
      <div style={{ width: `${100 - 60}%` }} className='bg-indigo-600 h-full mb-20'></div>
    </div>
  );
}
