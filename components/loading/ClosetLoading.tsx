// 옷장 페이지 진입 - Skeleton UI

import { Skeleton } from '@mui/material';
import Hr from '../utils/hr';

export default function ClosetLoading() {
  return (
    <main className='pt-30 px-20'>
      <span className='block mb-10 text-16 font-medium'>상의</span>
      <Hr className='border-indigo-600 mb-20' />
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 60px)',
          columnGap: '30px',
          rowGap: '10px',
          justifyItems: 'center',
        }}
        className='mb-40'
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className='w-60 h-60 rounded-8 relative overflow-hidden'>
            <Skeleton variant='rectangular' width={60} height={60} />
          </div>
        ))}
      </section>
      <span className='block mb-10 text-16 font-medium'>하의</span>
      <Hr className='border-indigo-600 mb-20' />
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 60px)',
          columnGap: '30px',
          rowGap: '10px',
          justifyItems: 'center',
        }}
        className='mb-40'
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className='w-60 h-60 rounded-8 relative overflow-hidden'>
            <Skeleton variant='rectangular' width={60} height={60} />
          </div>
        ))}
      </section>
    </main>
  );
}
