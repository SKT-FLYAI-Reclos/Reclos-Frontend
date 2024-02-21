import cls from '@/libs/cls';
import { HTMLAttributes } from 'react';

export default function Hr({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cls('border-t-1 border-solid', props.className ?? '')} />;
}
