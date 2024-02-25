import Hr from '@/components/utils/hr';
import AppLayout from '@/components/layouts/appLayout';
import Logo from '@/components/logo';
import TopNavbar from '@/components/navbar/topNavbar';
import AddBtn from '@/components/pages/closet/addBtn';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getCloset } from '@/apis/closetApi';
import { user } from '@/class/user';

const DUMMY_TOPS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  img: `https://via.placeholder.com/150x150?text=상의${i}`,
}));

export default function ClosetWrapper() {
  return (
    <Suspense>
      <Closet />
    </Suspense>
  );
}

async function Closet() {
  const clothes = await getCloset(user.id as number).then((res) => res.data);
  return (
    <AppLayout tnb={<TopNavbar left={<Logo className='text-28 font-bold' />} />}>
      <AddBtn />
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
          {clothes
            .filter((cloth) => cloth.cloth_type === 'top')
            .map((cloth, i) => (
              <div
                key={i}
                className='w-60 h-60 rounded-8 relative overflow-hidden bg-gray-light border-1 border-solid border-indigo-300'
              >
                <Image src={cloth.image} alt='상의' width={60} height={60} />
              </div>
            ))}
          <Link href={'/closet/top/all'} className='w-60 h-60 bg-gray-light rounded-8 flex justify-center items-center'>
            더보기
          </Link>
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
          {clothes
            .filter((cloth) => cloth.cloth_type === 'bottom')
            .map((cloth, i) => (
              <div
                key={i}
                className='w-60 h-60 rounded-8 relative overflow-hidden bg-gray-light border-1 border-solid border-indigo-300 flex justify-center items-center'
              >
                <Image src={cloth.image} alt='하의' width={60} height={60} />
              </div>
            ))}
          <Link
            href={'/closet/bottom/all'}
            className='w-60 h-60 bg-gray-light rounded-8 flex justify-center items-center'
          >
            더보기
          </Link>
        </section>
      </main>
    </AppLayout>
  );
}
