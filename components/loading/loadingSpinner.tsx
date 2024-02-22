import { HTMLAttributes } from 'react';
import LogoIcon from '../icons/logoIcon';
import cls from '@/libs/cls';
import './loadingSpinner.css';

export default function LoadingSpinner({
  width,
  height,
  ...props
}: { width: number; height: number } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        animation: 'rotateAnimation 1.5s infinite linear',
      }}
      className={cls('', props.className ?? '')}
    >
      <LogoIcon width={`${width}`} height={`${height}`} />
    </div>
  );
}
