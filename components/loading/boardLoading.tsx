// 판매글 로딩 컴포넌트 - 스켈레톤 UI

import { Skeleton } from '@mui/material';

export default function BoardLoading() {
  return (
    <div>
      <Skeleton variant='rectangular' height={400} className='w-full mb-10' />
      <div className='px-20'>
        <Skeleton variant='circular' width={50} height={50} className='mb-20' />
        <Skeleton variant='text' sx={{ fontSize: '48px', marginBottom: '10px' }} />
        <Skeleton variant='rectangular' sx={{ width: '100%', height: '100px' }} />
      </div>
    </div>
  );
}
