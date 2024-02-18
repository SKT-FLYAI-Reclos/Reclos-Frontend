'use client';

import HomeIcon from '../../public/icons/home.svg';
import ClosetIcon from '../../public/icons/closet.svg';
import ChattingIcon from '../../public/icons/chatting.svg';
import ProfileIcon from '../../public/icons/profile.svg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cls from '@/libs/cls';

export default function BottomNavbar() {
  const pathname = usePathname();
  return (
    <nav className='fixed bottom-0 w-full h-70 bg-white border-t-1 border-t-gray-300 flex justify-center items-center gap-20'>
      {navItems.map((navItem) => (
        <NavItem
          key={navItem.text}
          icon={navItem.icon}
          text={navItem.text}
          to={navItem.to}
          isActive={pathname === navItem.to}
        />
      ))}
    </nav>
  );
}

const navItems = [
  { icon: <HomeIcon />, text: '홈', to: '/', isActive: true },
  { icon: <ClosetIcon />, text: '옷장', to: '/closet', isActive: false },
  { icon: <ChattingIcon />, text: '채팅', to: '/chatting', isActive: false },
  { icon: <ProfileIcon />, text: 'My', to: '/mypage', isActive: false },
];

function NavItem({ icon, text, to, isActive }: { icon: any; text: string; to: string; isActive: boolean }) {
  return (
    <Link href={to} className='flex flex-col justify-center items-center gap-5 w-60 h-60'>
      {icon}
      <span className={cls('text-16', isActive ? 'font-bold' : 'font-normal')}>{text}</span>
    </Link>
  );
}
