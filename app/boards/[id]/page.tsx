import { user } from '@/class/user';
import CreditGauge from '@/components/creditGauge';
import CO2Icon from '@/components/icons/co2Icon';
import ProfileFillIcon from '@/components/icons/profileFillIcon';
import WaterDropIcon from '@/components/icons/waterDropIcon';
import AppLayout from '@/components/layouts/appLayout';
import BoardLoading from '@/components/loading/boardLoading';
import LoadingWithBackdrop from '@/components/loading/loadingWithBackdrop';
import PrevBtn from '@/components/navbar/prevBtn';
import TopNavbar from '@/components/navbar/topNavbar';
import Banner from '@/components/pages/boards/banner';
import LikeBtn from '@/components/pages/boards/likeBtn';
import { defaultUrl } from '@/constants/defaultUrl';
import { getDateDiff } from '@/libs/getDateDiff';
import TClothImage from '@/types/clothImageType';
import TUser from '@/types/userType';
import Link from 'next/link';
import { Suspense } from 'react';

export default function BoardWrapper({ params: { id } }: { params: { id: number } }) {
  return (
    <AppLayout showBNB={false}>
      <TopNavbar left={<PrevBtn />} autoOpaque showBorder={false} />
      <Suspense fallback={<BoardLoading />}>
        <Board id={id} />
      </Suspense>
    </AppLayout>
  );
}

async function Board({ id }: { id: number }) {
  const board: TBoard = await fetch(defaultUrl + `api/board/${id}`, { cache: 'no-store' }).then((res) => res.json());
  return (
    <div className='h-[calc(100vh-60px)] overflow-y-scroll'>
      <Banner slides={board.images.map((img) => ({ src: img.image, alt: '상품 모델 사진' }))} />
      <main className='px-20'>
        <section className='flex items-center justify-between mb-20'>
          {/* 프로필 / 이름 */}
          <div className='flex items-center gap-10'>
            <ProfileFillIcon width='50' height='50' />
            <span className='font-medium text-16'>{board.author.username}</span>
          </div>
          {/* 신뢰 레벨 */}
          <div className='flex flex-col gap-2 w-70'>
            <span className='font-medium text-indigo-600'>Lv.{board.author.level[0]?.manner_level || 3}</span>
            <CreditGauge className='w-full h-10' />
            <span className='text-12 text-gray-400 self-end'>신뢰 레벨</span>
          </div>
        </section>

        {/* 제목/가격 */}
        <section className='flex justify-between items-center mb-10'>
          <h2 className='text-20 font-semibold'>{board.title}</h2>
          <span className='text-16 font-normal'>{board.price}원</span>
        </section>

        {/* 카테고리/작성일 */}
        <span className='block mb-10 text-14 font-normal'>{`${board.category} · ${getDateDiff(
          new Date(),
          board.created_at
        )}전`}</span>

        {/* TODO: size/reward api 연결 */}
        {/* size/reward */}
        <section className='flex items-center mb-10'>
          <div className='mr-5 px-12 py-2 text-12 text-indigo-600 font-medium border-1 border-solid border-indigo-600 rounded-4'>
            여성
          </div>
          <div className='mr-10 px-12 py-2 text-12 text-indigo-600 font-medium border-1 border-solid border-indigo-600 rounded-4'>
            M
          </div>
          <div className='mr-5 px-12 py-2 border-1 border-solid border-blue-600 rounded-4 flex justify-center items-center gap-5'>
            <WaterDropIcon width='10' height='14' />
            <span className='text-12 text-blue-600 font-medium'>300L</span>
          </div>
          <div className='px-10 py-2 border-1 border-solid border-green-600 rounded-4 flex justify-center items-center gap-5'>
            <CO2Icon />
            <span className='text-12 text-green-600 font-medium'>1kg</span>
          </div>
        </section>

        {/* 해시태그 */}
        <section className='mb-10 flex items-center gap-3'>
          {['스탠다드핏', '기본니트', '라운드넥', '베이지'].map((tag) => (
            <span key={tag} className='text-16 font-normal text-blue-600'>
              #{tag}
            </span>
          ))}
        </section>

        {/* 본문 */}
        <p className='pr-50 mb-50'>
          스탠다드하면서 간결한 핏의 니트입니다. 편안하고 부드러운 착용감으로 데일리룩으로 활용하기 좋습니다.
        </p>
        {/* Bottom Bar */}
        <section className='fixed bottom-0 left-0 flex items-center justify-between gap-20 w-full h-60 py-10 px-20 bg-white border-t-1 border-solid border-t-gray-light'>
          <LikeBtn
            isLiked={user.id !== null && board.likes.find((user_) => user_.id === user.id) !== undefined}
            boardId={board.id}
          />
          <Link
            href={`/cody?images=${board.images.map((img) => img.image).join(',')}&cloth_type=${'top'}`} // TODO: cloth_type api 연결
            className=' grow py-12 bg-indigo-600 border-2 border-solid border-indigo-600 flex justify-center items-center text-white font-semibold text-16 rounded-8'
          >
            코디 생성하기
          </Link>
          <Link
            href={'/chatting'}
            className='grow py-12 bg-white border-2 border-solid border-indigo-600 flex justify-center items-center text-indigo-600 font-semibold text-16 rounded-8'
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
