'use client';

import HomeIcon from '../../public/icons/home.svg';
import ClosetIcon from '../../public/icons/closet.svg';
import ChattingIcon from '../../public/icons/chatting.svg';
import ProfileIcon from '../../public/icons/profile.svg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cls from '@/libs/cls';

type TNavItem = 'home' | 'closet' | 'chatting' | 'mypage';

const navItems: TNavItem[] = ['home', 'closet', 'chatting', 'mypage'];

export default function BottomNavbar() {
  const pathname = usePathname();
  return (
    <nav className='fixed bottom-0 w-full h-60 bg-white border-t-1 border-t-gray-300 flex justify-center items-center gap-20'>
      {navItems.map((navItem) => getNavItem(pathname, navItem))}
    </nav>
  );
}

function getNavItem(pathname: string, icon: TNavItem) {
  switch (icon) {
    case 'home':
      return (
        <Link href={'/'} className='flex flex-col justify-center items-center gap-5 w-60 h-60'>
          <HomeIcon fill={pathname === '/' ? 'black' : 'white'} stroke={pathname === '/' ? 'none' : '#9CA3AF'} />
          <span className={cls('text-12', pathname === '/' ? 'text-black' : 'text-gray-400')}>홈</span>
        </Link>
      );
    case 'closet':
      return (
        <Link href={'/closet'} className='flex flex-col justify-center items-center gap-5 w-60 h-60'>
          <ClosetIcon stroke={pathname === '/closet' ? 'black' : '#9CA3AF'} />
          <span className={cls('text-12', pathname === '/closet' ? 'text-black' : 'text-gray-400')}>옷장</span>
        </Link>
      );
    case 'chatting':
      return (
        <Link href={'/chatting'} className='flex flex-col justify-center items-center gap-5 w-60 h-60'>
          <ChattingIcon fill={pathname === '/chatting' ? 'black' : '#9CA3AF'} />
          <span className={cls('text-12', pathname === '/chatting' ? 'text-black' : 'text-gray-400')}>채팅</span>
        </Link>
      );
    case 'mypage':
      return (
        <Link href={'/mypage'} className='flex flex-col justify-center items-center gap-5 w-60 h-60'>
          <ProfileIcon fill={pathname === '/mypage' ? 'black' : '#9CA3AF'} />
          <span className={cls('text-12', pathname === '/mypage' ? 'text-black' : 'text-gray-400')}>My</span>
        </Link>
      );
  }
}

// const navItems = [
//   { icon: <HomeIcon fill='white' stroke='red' />, text: '홈', to: '/', isActive: true },
//   { icon: <ClosetIcon />, text: '옷장', to: '/closet', isActive: false },
//   { icon: <ChattingIcon />, text: '채팅', to: '/chatting', isActive: false },
//   { icon: <ProfileIcon />, text: 'My', to: '/mypage', isActive: false },
// ];

function NavItem({ icon, text, to, isActive }: { icon: any; text: string; to: string; isActive: boolean }) {
  return (
    <Link href={to} className='flex flex-col justify-center items-center gap-5 w-60 h-60'>
      {icon}
      <span className={cls('text-16', isActive ? 'font-bold' : 'font-normal')}>{text}</span>
    </Link>
  );
}
