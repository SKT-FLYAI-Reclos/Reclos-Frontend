import CreditGauge from '@/components/creditGauge';
import HeartIcon from '@/components/icons/heartIcon';
import ProfileFillIcon from '@/components/icons/profileFillIcon';
import AppLayout from '@/components/layouts/appLayout';
import Logo from '@/components/logo';
import PrevBtn from '@/components/navbar/prevBtn';
import TopNavbar from '@/components/navbar/topNavbar';
import Banner from '@/components/pages/boards/banner';
import { defaultUrl } from '@/constants/defaultUrl';
import TClothImage from '@/types/clothImageType';
import TUser from '@/types/userType';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

export default function BoardWrapper({ params: { id } }: { params: { id: number } }) {
  return (
    <AppLayout tnb={<TopNavbar left={<PrevBtn />} />} showBNB={false}>
      <Suspense fallback={<div>Loading...</div>}>
        <Board id={id} />
      </Suspense>
    </AppLayout>
  );
}

async function Board({ id }: { id: number }) {
  const board: TBoard = await fetch(defaultUrl + `api/board/${id}`, { cache: 'no-store' }).then((res) => res.json());
  return (
    <div>
      <Banner slides={board.images.map((img) => ({ src: img.image, alt: '상품 모델 사진' }))} />
      <main className='px-20'>
        <section className='flex justify-between mb-20'>
          {/* 프로필 / 이름 */}
          <div className='flex items-center gap-10'>
            <ProfileFillIcon />
            <span className='font-medium text-16'>{board.author.username}</span>
          </div>
          {/* 신뢰 레벨 */}
          <div className='flex flex-col gap-2 w-70'>
            <span className='font-medium text-green-600'>Lv.{board.author.level[0].manner_level}</span>
            <CreditGauge className='w-full h-10' />
            <span className='text-12 text-gray-400 self-end'>신뢰 레벨</span>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className='fixed bottom-0 left-0 flex items-center justify-between gap-20 w-full h-70 py-10 px-20 bg-white border-t-1 border-solid border-t-gray-light'>
          <button>
            <HeartIcon color='#22C55E' width='30' height='27' />
          </button>
          <Link
            href={`/cody?images=${board.images.map((img) => img.image).join(',')}`}
            className=' grow py-12 bg-indigo-600 border-2 border-solid border-indigo-600 flex justify-center items-center text-white font-semibold text-18 rounded-8'
          >
            코디 생성하기
          </Link>
          <Link
            href={'/chatting'}
            className='grow py-12 bg-white border-2 border-solid border-indigo-600 flex justify-center items-center text-indigo-600 font-semibold text-18 rounded-8'
          >
            채팅하기
          </Link>
        </section>
      </main>
    </div>
  );
}

type TBoard = {
  id: number;
  author: TUser;
  images: TClothImage[];
  likes: TUser[];
  title: string;
  content: string;
  category: string;
  price: number;
  created_at: string;
  updated_at: string;
};
