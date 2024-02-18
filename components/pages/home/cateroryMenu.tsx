'use client';

import { useState } from 'react';
import { allCategories, mainCategories } from '@/constants/categories';
import { Box, Drawer } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import CloseIcon from '../../../public/icons/close.svg';
import TopNavbar from '@/components/navbar/topNavbar';

export default function CategoryMenu() {
  const categories = [...mainCategories, { name: '전체보기', img: '/categories/list.png' }];
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <menu className='w-full h-80 flex justify-between items-center px-20'>
      <LeftDrawer open={showDrawer} onClose={() => setShowDrawer(false)} />
      {mainCategories.map(({ name, img }, i) => (
        <Link href={'#'} key={i} className='relative flex flex-col items-center gap-5 h-full'>
          <Image src={img} alt={'카테고리 - ' + name} width={40} height={40} objectFit='contain' />
          <span className='text-14 font-semibold'>{name}</span>
        </Link>
      ))}
      <button
        onClick={() => setShowDrawer((prev) => !prev)}
        className='relative flex flex-col items-center gap-5 h-full'
      >
        <Image
          src={'/categories/list.png'}
          alt={'카테고리 - ' + '전체보기'}
          width={40}
          height={40}
          objectFit='contain'
        />
        <span className='text-14 font-semibold'>전체보기</span>
      </button>
    </menu>
  );
}

function LeftDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer anchor='left' open={open} onClose={onClose} hideBackdrop>
      <Box sx={{ width: '100vw' }}>
        <div className='w-screen h-screen bg-white relative'>
          <TopNavbar
            title={<span className='text-black font-semibold text-18'>카테고리</span>}
            right={
              <button onClick={onClose} className=' top-20 right-20 text-black'>
                <CloseIcon width='16' height='16' />
              </button>
            }
          />

          <div className='relateve pt-84 flex flex-wrap'>
            {allCategories.map(({ name, img }, i) => (
              <Link href={'#'} key={i} className='relative flex flex-col items-center gap-5 w-[25%] mb-20'>
                <Image src={img} alt={'카테고리 - ' + name} width={40} height={40} objectFit='contain' />
                <span className='text-14 font-semibold'>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </Box>
    </Drawer>
  );
}
