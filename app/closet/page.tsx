import Hr from '@/components/hr';
import AppLayout from '@/components/layouts/appLayout';
import Logo from '@/components/logo';
import TopNavbar from '@/components/navbar/topNavbar';
import AddBtn from '@/components/pages/closet/addBtn';
import Image from 'next/image';
import Link from 'next/link';

const DUMMY_TOPS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  img: `https://via.placeholder.com/150x150?text=상의${i}`,
}));

export default function Closet() {
  return (
    <AppLayout tnb={<TopNavbar left={<Logo className='text-28 font-bold' />} />}>
      <AddBtn />
      <main className='pt-30 px-20'>
        <span className='block mb-10 text-16 font-medium'>상의</span>
        <Hr className='border-green-500 mb-20' />
        <section className='flex flex-wrap items-center gap-30 mb-40'>
          {DUMMY_TOPS.map((img) => (
            <div key={img.id} className='w-60 h-60 bg-blue-500 mb-10 rounded-8'></div>
          ))}
          <Link
            href={'/closet/top/all'}
            className='w-60 h-60 bg-gray-light mb-10 rounded-8 flex justify-center items-center'
          >
            더보기
          </Link>
        </section>
        <span className='block mb-10 text-16 font-medium'>하의</span>
        <Hr className='border-green-500 mb-20' />
        <section className='flex flex-wrap items-center gap-30 mb-40'>
          {DUMMY_TOPS.map((img) => (
            <div key={img.id} className='w-60 h-60 bg-blue-500 mb-10 rounded-8'></div>
          ))}
          <Link
            href={'/closet/bottom/all'}
            className='w-60 h-60 bg-gray-light mb-10 rounded-8 flex justify-center items-center'
          >
            더보기
          </Link>
        </section>
      </main>
    </AppLayout>
  );
}
