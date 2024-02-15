'use client';

import { useRouter } from 'next/navigation';

export default function CategoryMenu() {
  const router = useRouter();
  const menus = [
    { title: '남성 의류', onClick: () => router.push('#') },
    { title: '아우터', onClick: () => router.push('#') },
    { title: '니트', onClick: () => router.push('#') },
    { title: '셔츠', onClick: () => router.push('#') },
    { title: '슬렉스', onClick: () => router.push('#') },
  ];
  return (
    <menu className='w-full h-80 flex justify-between items-center px-20'>
      {menus.map((menu, index) => (
        <button key={index} onClick={menu.onClick} className='text-16 font-semibold'>
          {menu.title}
        </button>
      ))}
    </menu>
  );
}
