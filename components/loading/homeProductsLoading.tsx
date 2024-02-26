// 메인 페이지의 상품 로딩 - Skeleton UI

import { Skeleton } from '@mui/material';

export default function HomeProductsLoading() {
  return (
    <main className=' h-full'>
      <div className='flex flex-wrap justify-between items-center gap-15 px-10'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <Skeleton variant='rounded' className='w-[calc(100vw/2-10px-10px)] h-220' />
            <Skeleton variant='text' sx={{ fontSize: '16px', width: '70px' }} />
            <Skeleton variant='text' sx={{ fontSize: '16px', width: '100px' }} />
          </div>
        ))}
      </div>
    </main>
  );
}
